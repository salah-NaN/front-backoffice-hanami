import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import L from "leaflet";
import iconLocation from "/icon-location.png";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { redirect, useNavigate } from "react-router-dom";

const customIcon = L.icon({
  iconSize: [39, 41],
  iconAnchor: [20, 41],
  iconUrl: iconLocation,
});

const Actividad = ({ actividad, idPuntInteres }) => {
  const redirect = useNavigate();
  return (
    <div className="mt-12">
      <h1 className="text-2xl font-bold text-md mb-6">{actividad.nombre}</h1>
      
      <DeleteIcon
        onClick={() => redirect(`/borrar_actividad/${actividad.id}`)}
      />
      <EditIcon
        onClick={() =>
          redirect(`/editarActivitat/${actividad.id}/${idPuntInteres}`)
        }
      />
      <hr className="my-4" />
      <div class="flex flex-col md:flex-row">
        <div class="flex-1 flex flex-col sm:flex-row flex-wrap -mb-4 -mx-2">
          <div class="w-full sm:w-1/2 mb-4 px-2 ">
            <div class="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 class="text-2xl font-bold text-md mb-6">Categoría:</h3>
              <p class="text-sm">{actividad.categoria}</p>
            </div>
          </div>
          <div class="w-full sm:w-1/2 mb-4 px-2 ">
            <div class="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 class="text-2xl font-bold text-md mb-6">Descripción:</h3>
              <p class="text-sm"> {actividad.descripcion}</p>
            </div>
          </div>

          <div class="w-full sm:w-1/2 mb-4 px-2 ">
            <div class="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 className="text-xl font-medium mb-2">Imágenes:</h3>
              {actividad.imagenes.map((imagen) => (
                <div key={imagen.id}>
                  <p>{imagen.id}</p>
                  <img
                    src={
                      "http://localhost:3000/img/" + imagen.nombre + imagen.tipo
                    }
                    alt={imagen.id}
                    width="200"
                    height="200"
                  />
                </div>
              ))}
            </div>
          </div>

          <div class="w-full sm:w-1/2 mb-4 px-2 ">
            <div class="h-full py-4 px-6 border border-gray-500 border-t-0 border-l-0 rounded-br-xl">
              <h3 class="text-2xl font-bold text-md mb-6">Mapa</h3>

              <p class="text-sm">
                {actividad.comarca +
                  "," +
                  actividad.poblacion +
                  "," +
                  actividad.ubicacion}
              </p>
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
                  <Popup>Mi posición</Popup>
                </Marker>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Actividad;
