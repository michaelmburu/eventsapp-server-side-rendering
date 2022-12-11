import { useRouter } from 'next/router'
import EventLogistics from '../../components/event-detail/event-logistics'
import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import { getEventById } from '../../dummy-data'
const EventDetailPage = () => {
  const router = useRouter()
  const eventId = router.query.eventId
  const event = getEventById(eventId)

  //If event is not null return event detail else display no event found
  return event ? (
    <>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </>
  ) : (
    <h1>No event found</h1>
  )
}

export default EventDetailPage
