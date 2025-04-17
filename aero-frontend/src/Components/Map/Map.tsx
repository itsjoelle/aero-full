import React, { useEffect, useState } from 'react';
import { BsFillAirplaneFill } from 'react-icons/bs';
import { renderToStaticMarkup } from 'react-dom/server';
import {
  MapContainer,
  TileLayer,
  useMap,
  Marker,
  Popup,
  Polyline,
} from 'react-leaflet';
import { SlSizeFullscreen } from 'react-icons/sl';
import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css';
import { divIcon } from 'leaflet';
import Control from 'react-leaflet-custom-control';
import { RiFullscreenExitFill } from 'react-icons/ri';
import { Coordinate } from '../../types';

interface MapProps {
  mapData: Coordinate;
}
const ResizeMap = ({ mapFull }: { mapFull: boolean }) => {
  const map = useMap();

  useEffect(() => {
    map.invalidateSize();
  }, [mapFull, map]);

  return null;
};

const Map = ({ mapData: data }: MapProps) => {
  const [mapFull, setMapFull] = useState<boolean>(false);

  const iconMarkup = renderToStaticMarkup(
    <div>
      <BsFillAirplaneFill
        fontSize={30}
        color="#be3c50"
        style={{ transform: `rotate(${data.direction}deg)` }}
      />
    </div>
  );
  const customMarkerIcon = divIcon({
    html: iconMarkup,
  });

  return (
    <>
      {mapFull && (
        <div
          className={styles.mapModal}
          onClick={() => setMapFull(false)}
        ></div>
      )}
      <div
        className={mapFull ? styles.mapOuterFull : styles.mapOuter}
        onClick={(e) => e.stopPropagation()}
      >
        <MapContainer
          center={[data.planeLatitude, data.planeLongitude]}
          zoom={5}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <div>
            <ResizeMap mapFull={mapFull} />
          </div>

          <Marker
            position={[data.planeLatitude, data.planeLongitude]}
            icon={customMarkerIcon}
          >
            <Popup>Plane's current location</Popup>
          </Marker>

          <Marker position={[data.departureLatitude, data.departureLongitude]}>
            <Popup>{data.departureCity}</Popup>
          </Marker>

          <Marker
            position={[data.destinationLatitude, data.destinationLongitude]}
          >
            <Popup>{data.destinationCity}</Popup>
          </Marker>

          <Polyline
            positions={[
              [data.departureLatitude, data.departureLongitude],
              [data.destinationLatitude, data.destinationLongitude],
            ]}
            color="#df475e"
          />

          <Control prepend position="topright">
            <div
              onClick={() => setMapFull((prev) => !prev)}
              className={styles.fullscreen}
            >
              {mapFull ? (
                <RiFullscreenExitFill fontSize={21} />
              ) : (
                <SlSizeFullscreen fontSize={21} />
              )}
            </div>
          </Control>
        </MapContainer>
      </div>
    </>
  );
};

export default Map;
