import aircraftImg from '../assets/aircraft.png';
import aircraftstandImg from '../assets/scheduled.jpg';
import airportImg from '../assets/airports.jpg';
import airlineImg from '../assets/airlines.jpg';

export const cardData = [
  {
    navigate: 'flights',
    title: 'Live Flights',
    description:
      'Track real-time flight activity across the globe. Get instant updates on departures, arrivals, delays, and live flight paths with interactive maps and detailed insights.',
    image: aircraftImg,
  },
  {
    navigate: 'scheduled',
    title: 'Scheduled Flights',
    description:
      'Explore upcoming flights with our dynamic schedule display. View departure and arrival times, gate information, and status updates for planned flights worldwide.',
    image: aircraftstandImg,
  },
  {
    navigate: 'airports',
    title: 'Airports',
    description:
      'Explore detailed airport information, including locations, timezone details, and essential travel insights. Find the airport you need quickly and efficiently.',
    image: airportImg,
  },
  {
    navigate: 'airlines',
    title: 'Airlines',
    description:
      'Discover airlines from around the world, with key details such as fleet size, destinations, and operational history. Compare carriers and find the best options for your journey.',
    image: airlineImg,
  },
];
