import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import iconLocation from "/icon-location.png";

const customIcon = L.icon({
  iconSize: [39, 41],
  iconAnchor: [20, 41],
  iconUrl: iconLocation,
});

const PuntoInteres = ({ puntosInteres }) => {
  return (
    <div className="punto-interes">
      <h1 className="text-2xl font-semibold text-center">Punto Interes</h1>
      {/* Renderizar datos del punto de interés */}
      <MapContainer
        center={[puntosInteres.latitud, puntosInteres.longitud]}
        zoom={13}
        style={{ height: "20rem", width: "100%" }}
        className="rounded-lg shadow-md"
      >
        <TileLayer
          attribution="Mapa"
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
        />
        <Marker position={[puntosInteres.latitud, puntosInteres.longitud]} icon={customIcon}>
          <Popup>Mi posición</Popup>
        </Marker>
      </MapContainer>
      {/* Renderizar imágenes del punto de interés */}
      <div className="imagenes">
        <h2 className="text-xl font-medium mb-2">Imágenes:</h2>
        {puntosInteres.imagenes.map((imagen) => (
          <div key={imagen.id}>
            <p>{imagen.id}</p>
            <img
              src={"http://localhost:3000/img/" + imagen.nombre + imagen.tipo}
              alt={imagen.id}
              width="200"
              height="200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PuntoInteres;
