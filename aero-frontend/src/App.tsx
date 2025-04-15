import './App.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import FlightsRealtime from './Components/FlightsRealtime/FlightsRealtime';
import './styles.css';

import Airlines from './Components/Airports_Airlines/Airlines';
import FlightsScheduled from './Components/FlightsScheduled/FlightsScheduled';
import LandingPage from './Components/LandingPage/LandingPage';
import FlightSynopsis from './Components/FlightSynopsis/FlightSynopsis';
import Airports from './Components/Airports_Airlines/Airports';

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: 'airports',
    element: <Airports />,
  },

  {
    path: 'airlines',
    element: <Airlines />,
  },

  {
    path: 'flights',
    element: <FlightsRealtime />,
  },

  {
    path: 'synopsis',
    element: <FlightSynopsis />,
  },

  {
    path: 'scheduled',
    element: <FlightsScheduled />,
  },
]);

function App() {
  return (
    <div className="app-container">
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
