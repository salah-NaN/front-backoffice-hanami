import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditarPuntoInteres() {
  const API_URL = "http://localhost:3000/api";
  const { id } = useParams();
  const [puntoInteres, setPuntoInteres] = useState({});
  useEffect(() => {
    fetch(API_URL + "/puntos_interes/" + id)
      .then((resp) => resp.json())
      .then((data) => setPuntoInteres(data));
  }, []);
  const [formulario, setFormulario] = useState({
    nombre: puntoInteres.nombre,
    descripcion: puntoInteres.descripcion,
    ubicacion: puntoInteres.ubicacion,
    latitud: puntoInteres.latitud,
    longitud: puntoInteres.longitud,
    propietario_id: puntoInteres.propietario_id,
  });

  return (
    <div>
      <h1>Editar Punto Interes</h1>
      <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
      <form>
        <label htmlFor="nombre">Nombre: </label>
        <input
          type="text"
          id="nombre"
          name="nombre"
          value={formulario.nombre}
          placeholder={puntoInteres.nombre}
          onChange={(e) =>
            setFormulario({ ...formulario, nombre: e.target.value })
          }
        />
        <label htmlFor="descripcion">Descripción: </label>
        <input
          type="text"
          id="descripcion"
          name="descripcion"
          value={formulario.descripcion}
          placeholder={puntoInteres.descripcion}
          onChange={(e) =>
            setFormulario({ ...formulario, descripcion: e.target.value })
          }
        />
        <label htmlFor="ubicacion">Calle: </label>

        <input
          type="text"
          id="ubicacion"
          name="ubicacion"
          value={formulario.ubicacion}
          placeholder={puntoInteres.ubicacion}
          onChange={(e) =>
            setFormulario({ ...formulario, ubicacion: e.target.value })
          }
        />
        <br/>
      </form>
      </div>
    </div>
  );
}
