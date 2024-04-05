import { useState } from "react";
import { MapContainer, TileLayer, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "./iconLeaflet/constnats";

export const MapSearchMyLocation = ({ currentPosition }) => {

  const MapComponent = () => {
    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        L.marker([lat, lng], { icon }).addTo(map);
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
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <MapComponent />
    </MapContainer>
  );
};

export default MapSearchMyLocation;
