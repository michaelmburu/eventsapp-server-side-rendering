import { getFeaturedEvents } from '../helpers/api-util'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'
import { func } from 'prop-types'
const HomePage = (props) => {
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  )
}

export const getStaticProps = async () => {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: {
      events: featuredEvents,
    },

    revalidate: 1800
  }
}

export default HomePage
