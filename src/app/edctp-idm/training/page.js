import { client } from '@/lib/sanity'
import { edctpUpcomingEventsQuery } from '@/lib/edctpQueries'
import TrainingHub from '@/Components/edctp/pages/TrainingHub'

export const revalidate = 60

export const metadata = { title: 'Training | IDM-Africa' }

export default async function Page() {
  const events = await client.fetch(edctpUpcomingEventsQuery)
  return <TrainingHub events={events} />
}
