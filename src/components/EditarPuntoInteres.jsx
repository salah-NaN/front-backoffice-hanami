import { useEffect, useState } from "react";
import { MapSearchMyLocation } from "./MapSearchMyLocation";
import { useParams, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Contexto from "../Contexto";
export default function EditarPuntoInteres() {
  const API_URL = "http://localhost:3000/api";
  const { id } = useParams();
  const redirect = useNavigate();

  const [loading, setLoading] = useState(true);
  const [puntoInteres, setPuntoInteres] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    latitud: "",
    longitud: "",
    propietario_id: "",
  });

  useEffect(() => {
    fetch(API_URL + "/puntos_interes/" + id)
      .then((resp) => resp.json())
      .then((data) => {
        setPuntoInteres(data);
        setLoading(false); 
      });
  }, [id]);

  const [currentPosition, setCurrentPosition] = useState({
    lat: "",
    lon: "",
  });

  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    ubicacion: "",
    latitud: "",
    longitud: "",
    propietario_id: "",
  });
  

  useEffect(() => {
    setCurrentPosition({
      lat: puntoInteres.latitud,
      lon: puntoInteres.longitud,
    });
    setFormulario({
      
      nombre: puntoInteres.nombre,
      descripcion: puntoInteres.descripcion,
      ubicacion: puntoInteres.ubicacion,
      latitud: puntoInteres.latitud,
      longitud: puntoInteres.longitud,
      propietario_id: puntoInteres.propietario_id,
    })
  }, [puntoInteres]);

  const editarDades = (e) => {
    e.preventDefault();
    console.log(formulario);
    const credenciales = {
      ...formulario
    };
    console.log(credenciales);
    fetch(API_URL + "/puntos_interes/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    })
      .then((resp) => resp.json())
      .then((data) => {
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
          redirect("/Home");
        }
      });
  };

  const updatePosition = (lat, lon) => {
    setCurrentPosition({ lat, lon });
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div>
      <h1>Editar Punto Interes</h1>
      <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
        <form className="flex flex-col space-y-4" onSubmit={editarDades}>
          <label htmlFor="nombre">Nombre: </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formulario.nombre}
            placeholder={puntoInteres.nombre}
            onInput={(e) =>
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
          <label htmlFor="comarca">Comarca: </label>
          <input
            type="text"
            id="comarca"
            name="comarca"
            value={formulario.comarca}
            placeholder={puntoInteres.comarca}
            onChange={(e) =>
              setFormulario({ ...formulario, comarca: e.target.value })
            }
          />
          <label htmlFor="poblacion">Población: </label>
          <input
            type="text"
            id="poblacion"
            name="poblacion"
            value={formulario.poblacion}
            placeholder={puntoInteres.poblacion}
            onChange={(e) =>
              setFormulario({ ...formulario, poblacion: e.target.value })
            }
          />
          <label htmlFor="latitud">Latitud: </label>
          <input
            type="text"
            id="latitud"
            name="latitud"
            value={currentPosition.latitud}
            placeholder={puntoInteres.latitud}
            onChange={(e) =>
              setFormulario({ ...formulario, latitud: e.target.value })
            }
            disabled
          />
          <label htmlFor="longitud">Longitud: </label>
          <input
            type="text"
            id="longitud"
            name="longitud"
            value={currentPosition.longitud}
            placeholder={puntoInteres.longitud}
            onChange={(e) =>
              setFormulario({ ...formulario, longitud: currentPosition.longitud })
            }
            disabled
          />
          <br />
          {console.log(currentPosition)}
          <div className="">
            {currentPosition.lon && currentPosition.lat  && puntoInteres ? (
              <MapSearchMyLocation
                currentPosition={currentPosition}
                updatePosition={updatePosition}
              />
            ) : null}
          </div>
          <div className="">
            <p onClick={editarDades}>Enviar</p>
          </div>
          <button type="submit" />
        </form>
      </div>
    </div>
  );
}
