import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import iconLocation from "/icon-location.png";

const customIcon = L.icon({
  iconSize: [39, 41],
  iconAnchor: [20, 41],
  iconUrl: iconLocation,
});

const parseFecha = (date) => {
  return date
    ?.split("/")
    .map((d, index) => (index === 1 ? fechas[d] : d))
    .join(" ");
};

const PuntoInteres = ({ puntosInteres }) => {
  return (
    <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8">
      <div className="max-w-2xl lg:max-w-4xl mx-auto text-center">
        <h2 className="text-3xl font-extrabold dark:text-white sm:text-4xl">
          {puntosInteres.nombre}
        </h2>
      </div>
      <div className="mt-16 lg:mt-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="rounded-lg overflow-hidden">
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
                <Popup>Mi posición</Popup>
              </Marker>
            </MapContainer>
          </div>
          <div>
            <div className="max-w-full mx-auto rounded-lg overflow-hidden">
              <div className="px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  {console.log(puntosInteres)}
                  Direccion:
                </h3>
                <p className="mt-1 text-gray-600 dark:text-white">
                  {puntosInteres.comarca}, {puntosInteres.poblacion},{" "}
                  {puntosInteres.ubicacion}
                </p>
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Temporadas
                </h3>

                {puntosInteres.temporadas.map((temporada) => (
                  <>
                    <p key={temporada.id} className="mt-1 text-gray-600 dark:text-white">
                      {" "}
                      {temporada.nombre.split(/(?=[A-Z])/).join(" ")}{" "}
                    </p>
                    <p>
                      {parseFecha(temporada.fecha_inicio)} -{" "}
                      {parseFecha(temporada.fecha_fin)}
                    </p>
                  </>
                ))}
              </div>
              <div className="border-t border-gray-200 px-6 py-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Imagenes</h3>
                {puntosInteres.imagenes.map((imagen) => (
                  <div key={imagen.id}>
                    <img
                      src={
                        "http://localhost:3000/img/" +
                        imagen.nombre +
                        imagen.tipo
                      }
                      alt={imagen.id}
                      width="200"
                      height="200"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    /*  <div className="punto-interes">
      <h1 className="text-2xl font-semibold text-center">Punto Interes</h1>
      {/* Renderizar datos del punto de interés 
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
      {/* Renderizar imágenes del punto de interés
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
    </div> */
  );
};

export default PuntoInteres;
