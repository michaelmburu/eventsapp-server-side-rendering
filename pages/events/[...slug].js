import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../helpers/api-util'
import { useSWR } from 'swr'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
const FilteredEventsPage = (props) => {
  const { events, date } = props

  const router = useRouter()

   const filteredData = router.query.slug

   const {data, error} = useSWR('https://nextjs-course-e3831-default-rtdb.firebaseio.com/events.json')
  if (!filteredData) {
    return <p className='center'>Loading..</p>
  }

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth
  if (props.hasError) {
    return (
      <div>
        <>
          <ErrorAlert>
            <p>Invalid Filter. Please load correct values</p>
          </ErrorAlert>
          <div className='center'>
            <Button link='/events'>Show All Events</Button>
          </div>
        </>
      </div>
    )
  }

  //Human readable date
  const filterDate = new Date(date.year, date.month - 1)

  //Get filtered events
  const filteredEvents = events

  //If Filtered events are available show the,
  return filteredEvents && filteredEvents.length > 0 ? (
    <>
      <ResultsTitle date={filterDate} />
      <EventList items={filteredEvents} />
    </>
  ) : (
    <>
      <ErrorAlert>
        {' '}
        <p>No events found for the chosen filter</p>
      </ErrorAlert>
      <div className='center'>
        <Button link='/events'>Show All Events</Button>
      </div>
    </>
  )
}

export const getServerSideProps = async (context) => {
  const { params } = context
  const filteredData = params.slug

  const filteredYear = filteredData[0]
  const filteredMonth = filteredData[1]

  const numYear = +filteredYear
  const numMonth = +filteredMonth

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return {
      props: { hasError: true },
      //notFound:true, //404 page
      /* redirect:{
        destination: '/error'
      } */
    }
  }

  const filteredEvents = await getFilteredEvents({
    year: numYear,
    month: numMonth,
  })

  return {
    props: {
      events: filteredEvents,
      date: {
        year: numYear,
        month: numMonth,
      },
    },
  }
}

export default FilteredEventsPage
