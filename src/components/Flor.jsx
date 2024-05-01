import React from "react";
import { useNavigate } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const Flor = ({ flor }) => {
  const API_URL = "http://localhost:3000/api";
  const redirect = useNavigate();
  return (
    <div className="flor">
      {/* Renderizar datos de la flor */}
      <div>
        <DeleteIcon onClick={() => redirect(`/borrar_flor/${flor.id}`)} />
        <EditIcon onClick={() => redirect(`/editarFlor/${flor.id}`)} />
        <h2 className="text-xl font-medium mb-2">Nombre: {flor.especie}</h2>
        <h3 className="text-xl font-medium mb-2">
          Nombre científico: {flor.nombre_cientifico}
        </h3>
        <h3 className="text-xl font-medium mb-2">
          Descripción: {flor.descripcion}
        </h3>
        {/* Renderizar temporadas */}
        <div className="temporadas">
          <h2 className="text-xl font-medium mb-2">Temporadas actuales:</h2>
          <ul>
            {flor.temporadas.map((temporada) => (
              <div key={temporada.id}>
                <li>{temporada.nombre}</li>
                <hr className="my-4" />
              </div>
            ))}
          </ul>
          <DeleteIcon
            onClick={() => redirect(`/borrar_temporada/${flor.temporada.id}`)}
          />
          <EditIcon onClick={() => redirect(`/editarTemporada/${flor.temporada.id}`)} />
        </div>
      </div>
    </div>
  );
};

export default Flor;
