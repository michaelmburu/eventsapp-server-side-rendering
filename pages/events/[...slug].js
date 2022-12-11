import { useRouter } from 'next/router'
import { getFilteredEvents } from '../../dummy-data'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/ui/button'
import ErrorAlert from '../../components/ui/error-alert'
const FilteredEventsPage = () => {
  const router = useRouter()

  const filteredData = router.query.slug

  if (!filteredData) {
    return <p className='center'>Loading..</p>
  }

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
  const date = new Date(numYear, numMonth - 1)

  //Get filtered events
  const filteredEvents = getFilteredEvents({ year: numYear, month: numMonth })

  //If Filtered events are available show the,
  return filteredEvents && filteredEvents.length > 0 ? (
    <>
      <ResultsTitle date={date} />
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

export default FilteredEventsPage
