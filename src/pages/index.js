import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';
import NewsletterRegistration from '@/components/input/newsletter-registration';

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  console.log('events', props.events);

  return (
    <div>
      <NewsletterRegistration />
      <EventList items={props.events} />
    </div>
  );
}

export default HomePage;

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents,
    },
  };
}
