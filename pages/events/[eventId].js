import EventLogistics from '../../components/event-detail/event-logistics'
import EventSummary from '../../components/event-detail/event-summary'
import EventContent from '../../components/event-detail/event-content'
import { getEventById, getFeaturedEvents } from '../../helpers/api-util'
import Comments from '../../components/input/comments'
const EventDetailPage = (props) => {
  const event = props.selectedEvent

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
      <Comments eventId={event.id} />
    </>
  ) : (
    <h1 className='center'>Loading.....</h1>
  )
}

export const getStaticProps = async (context) => {
  const eventId = context.params.eventId

  const event = await getEventById(eventId)

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 30,
  }
}

export const getStaticPaths = async () => {
  const events = await getFeaturedEvents()
  const paths = events.map((event) => ({ params: { eventId: event.id } }))
  return {
    paths: paths,
    fallback: 'blocking',
  }
}

export default EventDetailPage
