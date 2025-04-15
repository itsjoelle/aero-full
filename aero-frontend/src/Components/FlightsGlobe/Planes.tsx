import { useState, useEffect } from 'react';
import Plane from './Plane';

export interface Flight {
  id: string;
  callsign: string;
  latitude: number;
  longitude: number;
  altitude: number;
  velocity: number;
}

const Planes = () => {
  const [flights, setFlights] = useState<Flight[]>([]);

  useEffect(() => {
    const updateFlights = async () => {
      try {
        const response = await fetch('http:localhost:9001/realtimeflights', {
          method: 'GET',
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setFlights(data);
        } else {
          console.error('Error from server:', data.message || data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    updateFlights();
    const interval = setInterval(updateFlights, 10000);
    return () => clearInterval(interval);
  }, []);

  return flights.map((flight, i) => <Plane key={i} flight={flight} />);
};

export default Planes;
