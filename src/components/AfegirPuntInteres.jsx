import { useEffect, useState } from "react";
import { MapSearchMyLocation } from "./MapSearchMyLocation";
import { useContext } from "react";
import Contexto from "../Contexto";
import { redirect } from "react-router-dom";

export const CrearPuntoInteres = () => {
  const API_URL = "http://localhost:3000/api";
  const { loguejat } = useContext(Contexto);
  const propietario_id = loguejat?.propietario_id;

  const [imagen, setImagen] = useState(null); // Estado para almacenar la imagen seleccionada

  const [puntoInteresId, setPuntoInteresId] = useState(null);

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
    provincia: "",
    propietario_id: propietario_id,
  });
  

  const subirImagen = (puntoInteresId) => {
    console.log(puntoInteresId);
    const formData = new FormData();
    const file = imagen[0]; // Assuming you're uploading a single image
    formData.append("imagen", file);

    // Extracting name and type from the file
    const nombre = file.name.split(".")[0];
    const tipo = file.name.split(".")[1];

    formData.append("nombre", nombre); // Add the name
    formData.append("tipo", tipo); // Add the type
    formData.append("idPuntoInteres", puntoInteresId); // Add the point of interest ID

    fetch(`${API_URL}/puntos_interes/img/${puntoInteresId}`, {
      method: "POST",
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    setFormulario({
      ...formulario,
      propietario_id: propietario_id,
    });
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

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      // Crear un objeto FormData para enviar la imagen
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

      // Enviar los datos al servidor
      const response = await fetch(`${API_URL}/puntos_interes`, opciones);
      const data = await response.json();
      if (data.error) {
        console.error(data.error);
      } else {
        setPuntoInteresId(data.id);
        console.log("Punto de interés creado:", data);
        // Subir la imagen después de crear el punto de interés
        subirImagen(data.id);
        redirect("/PuntInteres/" + data.id);
      }
    } catch (error) {
      console.error("Error al enviar los datos:", error);
    }
  };

  return (
    <div className="w-full h-full dark:bg-gray-800 dark:text-white">
      <br />
      {propietario_id ? (
        <div className="dark:bg-gray-800 dark:text-white w-full h-full">
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
                    setFormulario({
                      ...formulario,
                      longitud: currentPosition.lon,
                    })
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
              <div className="py-2">
                <input
                  type="text"
                  name="provincia"
                  placeholder="provincia"
                  className="border border-black"
                  onInput={(e) =>
                    setFormulario({
                      ...formulario,
                      provincia: e.target.value,
                    })
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
              <div className="py-2">
                <input
                  accept="image/*"
                  type="file"
                  name="imagen"
                  className="border border-black"
                  onChange={(e) => setImagen(e.target.files)}
                />
              </div>
              <div className=" flex justify-center items-center py-6">
                {console.log(formulario)}
                <button
                  className="py-2 px-4 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold rounded-md"
                  onClick={onSubmitForm}
                >
                  Enviar
                </button>
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
