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

export const MapSearchMyLocation = ({ currentPosition }) => {
  // const [isChecked, setIsChecked] = useState(false);

  const MapComponent = () => {
    const [position, setPosition] = useState(null);

    const map = useMapEvents({
      click(e) {
        const { lat, lng } = e.latlng;
        setPosition(e.latlng);
      },
    });
    return position === null ? null : (
      <Marker position={position}>
        <Popup>Mi posicion</Popup>
      </Marker>
    );
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
