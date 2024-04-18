import { useState } from "react";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./iconLeaflet/constnats";
import './marker.css';

export const MapSearchMyLocation = ({ currentPosition, updatePosition }) => {

  const MapComponent = () => {

    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        updatePosition(lat, lng); // Llama a la función de devolución de llamada para actualizar la posición
      },
    });

    return null;
  };

  return (
    <MapContainer
      center={[currentPosition.lat, currentPosition.lon]}
      zoom={13}
      style={{ height: "14rem", width: "25rem" }}
    >
      <TileLayer attribution="Mapa" url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png" />
      <MapComponent />
      <Marker position={[currentPosition.lat, currentPosition.lon]} icon={icon}>
        <Popup>Mi posicion</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapSearchMyLocation;
