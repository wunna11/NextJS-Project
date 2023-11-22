import { getFeaturedEvents } from '../dummy-data';
import EventList from '../components/events/event-list';

function HomePage(props) {
  // const featuredEvents = getFeaturedEvents();
  console.log('events', props.events);

  return (
    <div>
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
