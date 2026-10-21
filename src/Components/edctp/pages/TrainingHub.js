'use client'
import { ArrowRightIcon } from '@radix-ui/react-icons'
import Link from 'next/link'
import CorporateFareOutlinedIcon from '@mui/icons-material/CorporateFareOutlined'
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined'
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined'
import EventOutlinedIcon from '@mui/icons-material/EventOutlined'
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined'
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined'
import { useI18n } from '@/lib/idmI18n'
import { loc } from '@/lib/edctpLocalize'
import IdmPageHeader from '@/Components/edctp/IdmPageHeader'

const CARDS = [
  { href: '/edctp-idm/training/sites', icon: <CorporateFareOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.trainingSites', color: 'border-t-4 border-idblue-900' },
  { href: '/edctp-idm/training/mentors', icon: <SupervisorAccountOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.mentors', color: 'border-t-4 border-idblue-500' },
  { href: '/edctp-idm/training/fellows', icon: <PeopleOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.fellows', color: 'border-t-4 border-idred-600' },
  { href: '/edctp-idm/training/events', icon: <EventOutlinedIcon sx={{ fontSize: 32 }} />, titleKey: 'nav.trainingEvents', color: 'border-t-4 border-idblue-900' },
]

const MAX_UPCOMING = 3

function UpcomingEventCard({ event, locale }) {
  const start = new Date(event.startDateTime)
  const dateLocale = locale === 'fr' ? 'fr-FR' : 'en-GB'
  const description = loc(event.description, locale)

  return (
    <Link
      href="/edctp-idm/training/events"
      className="group flex gap-5 rounded-2xl bg-white border border-gray-100 p-6 shadow-sm hover:shadow-lg hover:border-idblue-500 transition-all duration-300"
    >
      <div className="flex h-20 w-20 shrink-0 flex-col items-center justify-center rounded-xl bg-idblue-900 text-white">
        <span className="text-2xl font-extrabold leading-none">{start.toLocaleDateString(dateLocale, { day: 'numeric' })}</span>
        <span className="mt-1 text-xs font-semibold uppercase tracking-wider text-idblue-200">
          {start.toLocaleDateString(dateLocale, { month: 'short', year: 'numeric' })}
        </span>
      </div>
      <div className="min-w-0">
        <h3 className="font-bold text-gray-900 group-hover:text-idblue-500 transition-colors leading-snug mb-2">
          {loc(event.title, locale)}
        </h3>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500 mb-2">
          <span className="flex items-center gap-1">
            <AccessTimeOutlinedIcon sx={{ fontSize: 14 }} className="text-idblue-500" />
            {start.toLocaleTimeString(dateLocale, { hour: '2-digit', minute: '2-digit' })}
          </span>
          {event.location && (
            <span className="flex items-center gap-1">
              <PlaceOutlinedIcon sx={{ fontSize: 14 }} className="text-idblue-500" />
              {event.location}
            </span>
          )}
        </div>
        {description && <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{description}</p>}
      </div>
    </Link>
  )
}

export default function TrainingHub({ events = [] }) {
  const { t, locale } = useI18n()
  const upcoming = (events || []).slice(0, MAX_UPCOMING)

  return (
    <>
      <IdmPageHeader
        eyebrow={t('nav.training')}
        title={t('training.title')}
        subtitle={t('training.hubIntro')}
        breadcrumb={[{ label: t('nav.training'), href: '/edctp-idm/training' }]}
      />

      {/* Upcoming trainings */}
      <section className="bg-white py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-idblue-500 mb-2">{t('nav.trainingEvents')}</p>
              <h2 className="text-3xl font-bold text-gray-900">{t('training.upcomingTitle')}</h2>
              <p className="mt-2 text-gray-500">{t('training.upcomingSubtitle')}</p>
            </div>
            <Link
              href="/edctp-idm/training/events"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-idred-600 hover:text-idred-800 transition-colors group"
            >
              {t('training.viewAllEvents')}
              <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>

          {upcoming.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {upcoming.map((event) => <UpcomingEventCard key={event._id} event={event} locale={locale} />)}
            </div>
          ) : (
            <p className="rounded-2xl border border-dashed border-gray-200 py-12 text-center text-gray-400">
              {t('training.emptyEvents')}
            </p>
          )}
        </div>
      </section>

      {/* Training areas */}
      <div className="bg-gray-50 py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {CARDS.map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className={`group bg-white rounded-2xl p-7 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${card.color}`}
              >
                <div className="text-idblue-900 group-hover:text-idred-600 transition-colors mb-4">
                  {card.icon}
                </div>
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-idblue-500 transition-colors mb-4">
                  {t(card.titleKey)}
                </h2>
                <span className="text-sm font-semibold text-idred-600 group-hover:text-idred-800 inline-flex items-center gap-1.5">
                  {t('common.learnMore')}
                  <ArrowRightIcon className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
