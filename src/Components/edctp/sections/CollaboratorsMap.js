'use client'
import { Fragment, useEffect, useMemo, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, GeoJSON, Polyline, CircleMarker, useMap, useMapEvents } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { useI18n } from '@/lib/idmI18n'
import { getCountryCoords, getContinent, getGeoName, CONTINENT_BOUNDS } from '@/lib/edctpCountryCoords'

const AFRICA_CENTER = [1, 20]
const AFRICA_ZOOM = 3
const BADGE_W = 64
const BADGE_H = 52
const TAIL = 8
const BADGE_GAP = 6 // min px between neighbouring badges
const LAYOUT_ITERATIONS = 200

const GROUPS = [
  { key: 'beneficiaries', color: '#003366', labelKey: 'partners.beneficiaries' },
  { key: 'collaborators', color: '#a71c20', labelKey: 'partners.collaborators' },
  { key: 'trainingSites', color: '#00AEEF', labelKey: 'partners.trainingSites' },
]

// Rest/hover fill for a partner country's boundary — "light blue" per the
// site's idblue theme scale (idblue-500 base outline, idblue-300 on hover).
const COUNTRY_BASE_STYLE = { fillColor: '#00AEEF', fillOpacity: 0.08, color: '#00AEEF', weight: 1.5, opacity: 0.6 }
const COUNTRY_HOVER_STYLE = { fillColor: '#66CDF3', fillOpacity: 0.55, color: '#0092C9', weight: 2, opacity: 0.9 }

function escapeHtml(str) {
  return String(str).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]))
}

function logoIcon(item, group) {
  const hasLogo = !!item.logo?.url
  const inner = hasLogo
    ? `<img src="${item.logo.url}" alt="" style="display:block;width:100%;height:100%;object-fit:contain;" />`
    : `<span style="color:white;font-weight:700;font-size:18px;">${escapeHtml((item.name || '?').charAt(0).toUpperCase())}</span>`

  return L.divIcon({
    className: '',
    html: `
      <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.35));">
        <div style="width:${BADGE_W}px;height:${BADGE_H}px;border-radius:8px;background:${hasLogo ? 'white' : group.color};border:2px solid ${group.color};display:flex;align-items:center;justify-content:center;overflow:hidden;padding:4px;box-sizing:border-box;">${inner}</div>
        <div style="width:0;height:0;border-left:${TAIL}px solid transparent;border-right:${TAIL}px solid transparent;border-top:${TAIL}px solid ${group.color};margin-top:-1px;"></div>
      </div>
    `,
    iconSize: [BADGE_W, BADGE_H + TAIL],
    iconAnchor: [BADGE_W / 2, BADGE_H + TAIL],
    popupAnchor: [0, -(BADGE_H + TAIL)],
  })
}

function resolveCoords(item) {
  if (typeof item.latitude === 'number' && typeof item.longitude === 'number') {
    return [item.latitude, item.longitude]
  }
  return getCountryCoords(item.country)
}

// Badges are a fixed size on screen, so overlap depends on zoom: lay them out
// in pixel space and redo it on every zoom. Each badge starts at its true
// location; overlapping pairs are pushed apart along their shallower overlap
// axis until no two badges overlap. Displaced badges get a leader line back
// to a dot at the true location (see DeclutteredMarkers).
function layoutBadges(anchors) {
  const w = BADGE_W + BADGE_GAP
  const h = BADGE_H + TAIL + BADGE_GAP
  const pos = anchors.map((a, i) => {
    // Seed exact duplicates (e.g. country-centroid fallbacks) in distinct directions
    const angle = (2 * Math.PI * i) / anchors.length
    return { x: a.x + Math.cos(angle) * 0.5, y: a.y + Math.sin(angle) * 0.5 }
  })

  for (let iter = 0; iter < LAYOUT_ITERATIONS; iter++) {
    let moved = false
    for (let i = 0; i < pos.length; i++) {
      for (let j = i + 1; j < pos.length; j++) {
        const dx = pos[j].x - pos[i].x
        const dy = pos[j].y - pos[i].y
        const overlapX = w - Math.abs(dx)
        const overlapY = h - Math.abs(dy)
        if (overlapX <= 0 || overlapY <= 0) continue
        moved = true
        // Separate along the axis that needs the smaller push, half each way
        if (overlapX / w < overlapY / h) {
          const push = (overlapX / 2) * (dx >= 0 ? 1 : -1)
          pos[i].x -= push
          pos[j].x += push
        } else {
          const push = (overlapY / 2) * (dy >= 0 ? 1 : -1)
          pos[i].y -= push
          pos[j].y += push
        }
      }
    }
    if (!moved) break
  }
  return pos
}

function DeclutteredMarkers({ pinned }) {
  const map = useMap()
  const [zoom, setZoom] = useState(() => map.getZoom())
  useMapEvents({ zoomend: () => setZoom(map.getZoom()) })

  const placed = useMemo(() => {
    const anchors = pinned.map((p) => map.project(p.coords, zoom))
    const positions = layoutBadges(anchors)
    return pinned.map((p, i) => {
      const display = map.unproject(positions[i], zoom)
      const displaced = anchors[i].distanceTo(positions[i]) > 2
      return { ...p, display: [display.lat, display.lng], displaced }
    })
  }, [map, pinned, zoom])

  return placed.map(({ item, coords, display, displaced, group }) => {
    const key = `${group.key}-${item._id}`
    return (
      <Fragment key={key}>
        {displaced && (
          <>
            <Polyline positions={[coords, display]} pathOptions={{ color: group.color, weight: 1.5, opacity: 0.8, dashArray: '3 3' }} interactive={false} />
            <CircleMarker center={coords} radius={4} pathOptions={{ color: 'white', weight: 1.5, fillColor: group.color, fillOpacity: 1 }} interactive={false} />
          </>
        )}
        <Marker position={display} icon={logoIcon(item, group)}>
          <Popup>
            <p className="font-semibold text-sm text-gray-900">{item.name}</p>
            {item.country && <p className="text-xs text-gray-500">{item.country}</p>}
          </Popup>
        </Marker>
      </Fragment>
    )
  })
}

function FitToMarkers({ points }) {
  const map = useMap()
  const key = points.map((p) => p.join(',')).join('|')

  useEffect(() => {
    if (points.length === 0) return
    if (points.length === 1) {
      map.setView(points[0], 6)
      return
    }
    map.fitBounds(points, { padding: [40, 40], maxZoom: 7 })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key])

  return null
}

// A tight fitBounds() alone isn't enough: when the container is much wider
// than the data's bounding box, Leaflet fills the leftover width with
// whatever's geographically adjacent — which is how unrelated continents
// were sneaking into view. maxBounds hard-locks how far a user can ever
// pan/zoom out, so nothing outside the continents that actually have
// collaborators is reachable, regardless of container aspect ratio.
function boundsForContinents(continents) {
  const boxes = [...continents].map((c) => CONTINENT_BOUNDS[c]).filter(Boolean)
  if (boxes.length === 0) return null
  const bounds = L.latLngBounds(boxes[0])
  boxes.slice(1).forEach((b) => bounds.extend(b))
  return bounds
}

function onEachCountry(feature, layer) {
  layer.setStyle(COUNTRY_BASE_STYLE)
  layer.on('mouseover', () => layer.setStyle(COUNTRY_HOVER_STYLE))
  layer.on('mouseout', () => layer.setStyle(COUNTRY_BASE_STYLE))
}

export default function CollaboratorsMap({ beneficiaries = [], collaborators = [], trainingSites = [] }) {
  const { t } = useI18n()
  const [worldGeo, setWorldGeo] = useState(null)

  useEffect(() => {
    fetch('/geo/world-countries.geo.json')
      .then((res) => res.json())
      .then(setWorldGeo)
      .catch(() => {})
  }, [])

  const pinned = useMemo(() => {
    const byGroup = { beneficiaries, collaborators, trainingSites }
    const withCoords = GROUPS.flatMap((group) =>
      (byGroup[group.key] || [])
        .map((item) => ({ item, coords: resolveCoords(item), group }))
        .filter((entry) => entry.coords)
    )
    return withCoords
  }, [beneficiaries, collaborators, trainingSites])

  const allPoints = pinned.map((p) => p.coords)

  const allItems = useMemo(
    () => [...beneficiaries, ...collaborators, ...trainingSites],
    [beneficiaries, collaborators, trainingSites]
  )

  const maxBounds = useMemo(() => {
    const continents = new Set(allItems.map((item) => getContinent(item.country)).filter(Boolean))
    return boundsForContinents(continents)
  }, [allItems])

  const partnerCountryFeatures = useMemo(() => {
    if (!worldGeo) return null
    const geoNames = new Set(allItems.map((item) => getGeoName(item.country)).filter(Boolean))
    return { type: 'FeatureCollection', features: worldGeo.features.filter((f) => geoNames.has(f.properties.name)) }
  }, [worldGeo, allItems])

  if (pinned.length === 0) {
    return (
      <div className="w-full flex items-center justify-center bg-gray-50" style={{ height: '65vh', minHeight: 480 }}>
        <p className="text-gray-400">{t('partners.mapEmpty')}</p>
      </div>
    )
  }

  return (
    <div className="relative w-full" style={{ height: '65vh', minHeight: 480 }}>
      <MapContainer
        center={AFRICA_CENTER}
        zoom={AFRICA_ZOOM}
        scrollWheelZoom={false}
        maxBounds={maxBounds}
        maxBoundsViscosity={1.0}
        style={{ height: '100%', width: '100%' }}
      >
        {/* Esri World Street Map: English labels everywhere, capital cities marked, oceans/lakes/rivers named.
            (OSM's standard tiles label each country in its local language.) Note Esri's {y}/{x} order. */}
        <TileLayer
          attribution='Tiles &copy; <a href="https://www.esri.com">Esri</a> &mdash; Sources: Esri, HERE, Garmin, USGS, NGA, EPA, USDA, NPS, &copy; OpenStreetMap contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}"
          maxZoom={19}
        />
        <FitToMarkers points={allPoints} />

        {partnerCountryFeatures && (
          <GeoJSON data={partnerCountryFeatures} style={() => COUNTRY_BASE_STYLE} onEachFeature={onEachCountry} />
        )}

        <DeclutteredMarkers pinned={pinned} />
      </MapContainer>

      <div className="absolute bottom-4 left-4 z-[1000] rounded-xl bg-white/95 backdrop-blur-sm shadow-lg px-4 py-3 flex flex-col gap-1.5">
        {GROUPS.map((group) => (
          <div key={group.key} className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full shrink-0" style={{ backgroundColor: group.color }} />
            <span className="text-xs font-medium text-gray-700">{t(group.labelKey)}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
