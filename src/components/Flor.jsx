import React from "react";

const Flor = ({ flor }) => {
  return (
    <div className="flor">
      {/* Renderizar datos de la flor */}
      <div>
        <h2 className="text-xl font-medium mb-2">Nombre: {flor.especie}</h2>
        <h3 className="text-xl font-medium mb-2">Nombre científico: {flor.nombre_cientifico}</h3>
        <h3 className="text-xl font-medium mb-2">Descripción: {flor.descripcion}</h3>
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
        </div>
      </div>
    </div>
  );
};

export default Flor;
