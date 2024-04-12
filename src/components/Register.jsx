import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/api";

export default () => {
  const [email, setEmail] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [password, setPassword] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("");
  const [documento, setDocumento] = useState("");
  const [latitud, setLatitud] = useState("");
  const [longitud, setLongitud] = useState("");
  const [ubicacion, setUbicacion] = useState("");
  const [poblacion, setPoblacion] = useState("");
  const [comarca, setComarca] = useState("");

  const redirect = useNavigate();

  const handleChange = (e) => {
    setTipoDocumento(e.target.value);
  };

  const registra = (e) => {
    e.preventDefault();

    //console.log("loguejant..", email, password)

    const credenciales = {
      nombre,
      apellidos,
      email,
      password,
      tipoDocumento,
      documento,
      latitud,
      longitud,
      ubicacion,
      poblacion,
      comarca,
    };

    const opciones = {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
    };

    fetch(API_URL + "/register", opciones)
      .then((resp) => resp.json())
      .then((data) => {
        if (!data.error) {
          redirect("/login");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="mt-4  ">
      <form onSubmit={registra} className="m-8 p-4 border rounded-md">
        <h1 className="p-4 text-center">Registrar</h1>
        <div>
          <label
            className=" text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Nombre
          </label>
          <input
            onInput={(e) => setNombre(e.target.value)}
            value={nombre}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="nombre"
            placeholder="Juan"
          />
        </div>
        <div>
          <label
            className=" text-gray-700 text-sm font-bold mb-2"
            htmlFor="lastname"
          >
            Apellidos
          </label>
          <input
            value={apellidos}
            onInput={(e) => setApellidos(e.target.value)}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="apellidos"
            placeholder="Martinez Perez"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold"
            htmlFor="email"
          >
            {" "}
            Email
          </label>
          <input
            onInput={(e) => setEmail(e.target.value)}
            value={email}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 "
            id="email"
            type="text"
            placeholder="ejemplo@example.com"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            onInput={(e) => setPassword(e.target.value)}
            value={password}
            className="shadow appearance-none border
                rounded w-full py-2 px-3 text-gray-700 mb-3 "
            id="password"
            type="password"
            placeholder="******************"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="tipoDocumento"
          >
            Tipo Documento
          </label>
          <select
            id="tipoDocumento"
            onChange={handleChange}
            value={tipoDocumento}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option selected>Escoje un tipo de documento</option>
            <option value="DNI">DNI</option>
            <option value="CIF">CIF</option>
            <option value="NIE">NIE</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="documento"
          >
            Documento
          </label>
          <input
            onInput={(e) => setDocumento(e.target.value)}
            value={documento}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="documento"
            placeholder="12345678A"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="latitud"
          >
            Latitud
          </label>
          <input
            onInput={(e) => setLatitud(e.target.value)}
            value={latitud}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="latitud"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="longitud"
          >
            Longitud
          </label>
          <input
            onInput={(e) => setLongitud(e.target.value)}
            value={longitud}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="longitud"
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="ubicacion"
          >
            Ubicacion
          </label>
          <input
            onInput={(e) => setUbicacion(e.target.value)}
            value={ubicacion}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="ubicacion"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="poblacion"
          >
            Poblacion
          </label>
          <input
            onInput={(e) => setPoblacion(e.target.value)}
            value={poblacion}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="poblacion"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="comarca"
          >
            Comarca
          </label>
          <input
            onInput={(e) => setComarca(e.target.value)}
            value={comarca}
            type="text"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="comarca"
          />
        </div>

        <div className="flex flex-row gap-4 items-center justify-center">
          <button
            className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Registrar
          </button>

          <button
            className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            onClick={() => redirect("/login")}
          >
            Ya te has Registrado?
            <br></br>
            Inicia sesion
          </button>
        </div>
      </form>
    </div>
  );
};
