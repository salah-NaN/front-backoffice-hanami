import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import "./marker.css";
import iconLocation from "/icon-location.png";
import { useNavigate } from "react-router-dom";

const customIcon = L.icon({
  iconSize: [39, 41],
  iconAnchor: [20, 41],
  iconUrl: iconLocation,
});

export default () => {
  const API_URL = "http://localhost:3000/api";
  const [puntosInteres, setPuntosInteres] = useState({});
  const [temporadas, setTemporadas] = useState([]);
  const [actividades, setActividades] = useState([]);
  const redirect = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetch(`${API_URL}/puntos_interes/${id}`)
      .then((resp) => resp.json())
      .then((data) => setPuntosInteres(data))
      .catch((err) => console.log(err));

    fetch(`${API_URL}/actividades_punto_interes/${id}`)
      .then((resp) => resp.json())
      .then((temporada) => setTemporadas(temporada))
      .catch((err) => console.log(err));
  }, [id]);
  console.log(temporadas);
  if (
    Object.keys(puntosInteres).length === 0 &&
    Object.keys(actividades).length === 0
  ) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold text-center">Punto Interes</h1>
          <hr className="my-4" />

          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-xl font-medium mb-2 md:mb-0">Nombre</h2>
            <h3>{puntosInteres.nombre}</h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-xl font-medium mb-2 md:mb-0">Descripción</h2>
            <h3>{puntosInteres.descripcion}</h3>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <h2 className="text-xl font-medium mb-2 md:mb-0">Calle</h2>
            <h3>{puntosInteres.ubicacion}</h3>
          </div>
        </div>
        <div className="flex flex-col mt-4">
          <h2 className="text-xl font-medium mb-2">Ubicación</h2>
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
            <Marker
              position={[puntosInteres.latitud, puntosInteres.longitud]}
              icon={customIcon}
            >
              <Popup>Mi posicion</Popup>
            </Marker>
          </MapContainer>
        </div>
        <div className="flex justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md"
              onClick={() => redirect(`/editarPuntInteres/${id}`)}
            >
              Editar
            </button>
          </div>
        </div>
      </div>
      <div className="flex flex-col min-h-screen bg-gray-100">
        <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
          <div className="flex flex-col space-y-4">
            <h1 className="text-2xl font-semibold text-center">Actividades</h1>
            <hr className="my-4" />

            {temporadas.map((temporada) =>
              temporada.actividades.map((actividad) => (
                <div key={actividad.id}>
                  <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-medium mb-2 md:mb-0">Nombre</h2>
                    <h3>{actividad.nombre}</h3>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-medium mb-2 md:mb-0">
                      Categoria
                    </h2>
                    <h3>{actividad.categoria}</h3>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-medium mb-2 md:mb-0">
                      Descripción
                    </h2>
                    <h3>{actividad.descripcion}</h3>
                  </div>
                  <div className="flex flex-col md:flex-row justify-between">
                    <h2 className="text-xl font-medium mb-2 md:mb-0">
                      Ubicacion:
                    </h2>
                    <h3>Calle: {actividad.ubicacion}</h3>
                    <h3>Ciudad: {actividad.poblacion}</h3>
                    <h3>Comarca: {actividad.comarca}</h3>
                    <MapContainer
                      center={[actividad.latitud, actividad.longitud]}
                      zoom={13}
                      style={{ height: "20rem", width: "100%" }}
                      className="rounded-lg shadow-md"
                    >
                      <TileLayer
                        attribution="Mapa"
                        url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
                      />
                      <Marker
                        position={[actividad.latitud, actividad.longitud]}
                        icon={customIcon}
                      >
                        <Popup>Mi posicion</Popup>
                      </Marker>
                    </MapContainer>
                  </div>
                  <div className="flex justify-center p-4 bg-gray-100 rounded-lg shadow-md">
                  <button
                    className="px-4 py-2 bg-green-500 hover:bg-green-700 text-white font-semibold rounded-md"
                    onClick={() => redirect(`/editarActivitat/`+actividad.id+`/`+id)}
                  >
                    Editar
                  </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
        <div className="flex justify-between p-4 bg-gray-100 rounded-lg shadow-md">
          <button
            className="px-4 py-2 bg-blue-500 hover:bg-blue-700 text-white font-semibold rounded-md"
            onClick={() => window.history.back()}
          >
            Volver
          </button>
          <div className="flex space-x-2">
            <button
              className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold rounded-md"
              onClick={() => (window.location.href = "/afegirActivitat/" + id)}
            >
              Crear Actividad
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
