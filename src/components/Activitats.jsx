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
    <div className="actividad">
      {/* Renderizar datos de la actividad */}
      <div>
        <h2 className="text-xl font-medium mb-2">Nombre: {actividad.nombre}</h2>
        <h3 className="text-xl font-medium mb-2">
          Categoría: {actividad.categoria}
        </h3>
        <h3 className="text-xl font-medium mb-2">
          Descripción: {actividad.descripcion}
        </h3>
        <h3 className="text-xl font-medium mb-2">
          Ubicación: {actividad.ubicacion}
        </h3>
        <h3 className="text-xl font-medium mb-2">
          Ciudad: {actividad.poblacion}
        </h3>
        <h3 className="text-xl font-medium mb-2">
          Comarca: {actividad.comarca}
        </h3>
        {/* Renderizar mapa */}
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
        {/* Renderizar imágenes de la actividad */}
        <div className="imagenes">
          <h2 className="text-xl font-medium mb-2">Imágenes:</h2>
          {actividad.imagenes.map((imagen) => (
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
        <DeleteIcon onClick={() => redirect(`/borrar_actividad/${actividad.id}`)}/>
        <EditIcon onClick={() => redirect(`/editarActivitat/${actividad.id}/${idPuntInteres}`)}/>

      </div>
    </div>
  );
};

export default Actividad;
