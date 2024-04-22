import { useEffect, useState } from "react";
import { useContext } from "react";
import Contexto from "../Contexto";
import { useParams } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import icon from "./iconLeaflet/constnats.jsx";
import './marker.css';

export default () => {
  const API_URL = "http://localhost:3000/api";
  const [points, setPoints] = useState({});
  const loguejat = useContext(Contexto);
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/puntos_interes/` + id)
      .then((resp) => resp.json())
      .then((data) => setPoints(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div>
      <div>
        <h1>{points.nombre}</h1>
        <h1>{points.descripcion}</h1>
        <h1>{points.ubicacion}</h1>
        <h1>{points.poblacion}</h1>
        <h1>{points.comarca}</h1>
        {points.latitud && points.longitud && (
          <MapContainer
            center={[points.latitud, points.longitud]}
            zoom={13}
            style={{ height: "14rem", width: "25rem" }}
          >
            <TileLayer
              attribution="Mapa"
              url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
            />
            <Marker
              position={[points.latitud, points.longitud]}
              icon={icon}
            >
              <Popup>Mi posicion</Popup>
            </Marker>
          </MapContainer>
        )}
      </div>
    </div>
  );
};
