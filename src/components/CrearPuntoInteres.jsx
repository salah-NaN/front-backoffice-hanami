import { useEffect, useState } from "react";
import { MapSearchMyLocation } from "./";

export const CrearPuntoInteres = () => {
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
  });

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
      })
      .catch((error) => console.log(error));
  }, []);

  const onSubmitForm = () => {
    event.preventDefault();
  };

  return (
    <div className="bg-sky-200 w-full h-full">
      <div className="flex justify-center items-center h-full">
        <form onSubmit={onSubmitForm}>
          <h1 className="text-white">Añade un punto de interes</h1>
          <div className="py-2">
            <input
              type="text"
              name="nombre"
              placeholder="nombre"
              className="border border-black"
              onChange={() =>
                setFormulario({ ...formulario, nombre: event.target.value })
              }
            ></input>
          </div>
          <div className="py-2">
            <input
              type="text"
              name="descripcion"
              placeholder="descipcion"
              className="border border-black"
              onChange={() =>
                setFormulario({
                  ...formulario,
                  descripcion: event.target.value,
                })
              }
            ></input>
          </div>
          <div className="py-2">
            <input
              type="text"
              name="latitud"
              placeholder="latidud"
              className="border border-black"
              onChange={() =>
                setFormulario({ ...formulario, latitud: event.target.value })
              }
            ></input>
          </div>
          <div className="">
            <input
              type="text"
              name="logitud"
              placeholder="longitud"
              className="border border-black"
              onChange={() =>
                setFormulario({ ...formulario, longitud: event.target.value })
              }
            ></input>
          </div>
          {/* dudo si es servible este campo */}
          <div className="py-2">
            <input
              type="text"
              name="ubicacion"
              placeholder="ubicacion"
              className="border border-black"
              onChange={() =>
                setFormulario({ ...formulario, ubicacion: event.target.value })
              }
            ></input>
          </div>
          <div className="py-2">
            <input
              type="text"
              name="poblacion"
              placeholder="poblacion"
              className="border border-black"
              onChange={() =>
                setFormulario({ ...formulario, poblacion: event.target.value })
              }
            ></input>
          </div>
          <div className="py-2">
            <input
              type="text"
              name="comarca"
              placeholder="comarca"
              className="border border-black"
              onChange={() =>
                setFormulario({ ...formulario, comarca: event.target.value })
              }
            ></input>
          </div>
          <div className="">
            {currentPosition.lat &&
            currentPosition.lon ? (
              <MapSearchMyLocation currentPosition={currentPosition} />
            ) : null}
          </div>
          <div className="">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPuntoInteres;
