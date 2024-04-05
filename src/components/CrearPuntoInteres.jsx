import { useState } from "react";

export const CrearPuntoInteres = () => {
  const [formulario, setFormulario] = useState({
    nombre: "",
    descripcion: "",
    latitud: "",
    longitud: "",
    ubicacion: "",
    poblacion: "",
    comarca: "",
  });

  const onSubmitForm = () => {
    event.preventDefault();
  };

  return (
    <div className="bg-sky-200 w-full h-full">
      <div className="flex justify-center items-center h-full">
        <form onSubmit={onSubmitForm}>
          <h1 className="text-white">Añade un punto de interes</h1>
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
          <div className="">
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
            <button type="submit">Enviar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CrearPuntoInteres;
