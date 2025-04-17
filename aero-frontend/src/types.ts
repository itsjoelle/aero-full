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

export interface AirlineObj {
  link: string | undefined;
  airline_id: string;
  airline_name: string;
  callsign: string;
  country_iso2: string;
  country_name: string;
  fleet_size: string;
  fleet_average_age: string;
  date_founded: string | null;
  hub_code: string | null;
  iata_code: string;
  iata_prefix_accounting: string | null;
  icao_code: string;
  status: string;
  type: string | null;
  id: string;
}

export interface AirportObj {
  link: string | undefined;
  airport_name: string;
  country_name: string | null;
  id: string;
  latitude: string;
  longitude: string;
  timezone: string;
}

interface Aircraft {
  iata: string;
  icao: string;
  icao24: string;
  registration: string;
}

interface Airline {
  iata: string;
  icao: string;
  name: string;
}

interface Arrival {
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
}

interface Departure {
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
}

interface Flight {
  codeshared: null;
  iata: string;
  icao: string;
  number: string;
}

export interface Coordinate {
  planeLatitude: number;
  planeLongitude: number;
  departureCity: string;
  destinationCity: string;
  departureLatitude: number;
  departureLongitude: number;
  destinationLatitude: number;
  destinationLongitude: number;
  direction: number;
}

export interface SynopsisData {
  flight: string;
  status: string;
  city_depart: string;
  terminal_depart: string;
  terminal_gate_depart: string;
  city_arrival: string;
  terminal_arrival: string;
  terminal_gate_arrival: string;
  latitude: number;
  longitude: number;
  horizontal_speed: number;
  vertical_speed: number;
  airline_name: string;
  updated: string;
  coordinates: Coordinate;
}
