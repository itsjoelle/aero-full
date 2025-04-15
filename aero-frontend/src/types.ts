export interface FlightProps {
  aircraft: Aircraft;
  airline: Airline;
  arrival: Arrival;
  departure: Departure;
  flight: Flight;
  flight_date: string;
  flight_status: string;
  gate: string;
  live: null;
}

type Aircraft = {
  iata: string;
  icao: string;
  icao24: string;
  registration: string;
};

type Airline = {
  iata: string;
  icao: string;
  name: string;
};

type Arrival = {
  actual: string | null;
  actual_runway: string | null;
  airport: string;
  baggage: string | null;
  delay: string | null;
  estimated: string;
  estimated_runway: string | null;
  gate: string | null;
  iata: string;
  scheduled: string;
  terminal: string;
  timezone: string;
};

type Departure = {
  actual: string;
  actual_runway: string;
  airport: string;
  delay: number;
  estimated: string;
  estimated_runway: string;
  gate: string;
  iata: string;
  icao: string;
  scheduled: string;
  terminal: string;
  timezone: string;
};

type Flight = {
  codeshared: null;
  iata: string;
  icao: string;
  number: string;
};
