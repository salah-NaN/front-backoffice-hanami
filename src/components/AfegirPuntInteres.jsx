import { useEffect, useState } from "react";
import { MapSearchMyLocation } from "./MapSearchMyLocation";
import { useContext } from "react";
import Contexto from "../Contexto";

export const CrearPuntoInteres = () => {
  const API_URL = "http://localhost:3000/api";
  const { loguejat } = useContext(Contexto);
  const propietario_id = loguejat?.propietario_id;


  const [currentPosition, setCurrentPosition] = useState({
    lat: "",
    lon: "",
  });
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    latitud: "",
    longitud: "",
    ubicacion: "",
    poblacion: "",
    comarca: "",
    propietario_id: propietario_id,
  });

  useEffect(() => {
    setFormulario({
      ...formulario,
      propietario_id: propietario_id,})
  }, [propietario_id]);

  useEffect(() => {
    function obtenerUbicacion() {
      return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              resolve(position);
            },
            (error) => {
              reject(error);
            }
          );
        }
      });
    }

    obtenerUbicacion()
      .then((position) => {
        const { coords } = position;
        const { latitude, longitude } = coords;
        setCurrentPosition({ lat: latitude, lon: longitude });
        setFormulario({
          ...formulario,
          latitud: latitude,
          longitud: longitude,
        });
      })
      .catch((error) => console.log(error));
  }, []);

  const updatePosition = (lat, lon) => {
    setCurrentPosition({ lat, lon });
  };

  const onSubmitForm = (e) => {
    e.preventDefault();
    const credenciales = {
      ...formulario,
      latitud: currentPosition.lat,
      longitud: currentPosition.lon,
    };
    const opciones = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    };
    fetch(`${API_URL}/puntos_interes`, opciones)
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
        if (data.error) {
          console.log(data.error);
        } else {
          console.log(data);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="bg-sky-200 w-full h-full">
      {propietario_id ? (
        <div className="bg-sky-200 w-full h-full">
          <div className="flex justify-center items-center h-full">
            <form onSubmit={onSubmitForm}>
              <h1 className="text-white">Añade un punto de interes.</h1>
              <div className="py-2">
              <input
                type="text"
                name="nombre"
                placeholder="nombre"
                className="border border-black"
                onInput={(e) =>
                  setFormulario({ ...formulario, nombre: e.target.value })
                }
              ></input>
            </div>
            <div className="py-2">
              <input
                type="text"
                name="descripcion"
                placeholder="descipcion"
                className="border border-black"
                onInput={(e) =>
                  setFormulario({
                    ...formulario,
                    descripcion: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="py-2">
              <input
                type="text"
                name="latitud"
                placeholder="latidud"
                value={currentPosition.lat}
                className="border border-black"
                onChange={(e) =>
                  setFormulario({ ...formulario, latitud: e.target.value })
                }
              ></input>
            </div>
            <div className="">
              <input
                type="text"
                name="logitud"
                placeholder="longitud"
                value={currentPosition.lon}
                className="border border-black"
                onInput={(e) =>
                  setFormulario({ ...formulario, longitud: currentPosition.lon })
                }
              ></input>
            </div>
            <div className="py-2">
              <input
                type="text"
                name="ubicacion"
                placeholder="Calle"
                className="border border-black"
                onInput={(e) =>
                  setFormulario({
                    ...formulario,
                    ubicacion: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="py-2">
              <input
                type="text"
                name="poblacion"
                placeholder="poblacion"
                className="border border-black"
                onInput={(e) =>
                  setFormulario({
                    ...formulario,
                    poblacion: e.target.value,
                  })
                }
              ></input>
            </div>
            <div className="py-2">
              <input
                type="text"
                name="comarca"
                placeholder="comarca"
                className="border border-black"
                onInput={(e) =>
                  setFormulario({ ...formulario, comarca: e.target.value })
                }
              ></input>
            </div>
            <div className="">
              {currentPosition.lat && currentPosition.lon ? (
                <MapSearchMyLocation
                  currentPosition={currentPosition}
                  updatePosition={updatePosition}
                />
              ) : null}
            </div>
            <div className="">
              {console.log(formulario)}
              <p onClick={onSubmitForm}>Enviar</p>
            </div>
            </form>
          </div>
        </div>
      ) : (
        <h1>Cargando data</h1>
      )}
    </div>
  );
};

export default CrearPuntoInteres;
