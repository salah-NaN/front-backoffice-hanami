import { useParams, useNavigate } from "react-router-dom";
import { MapSearchMyLocation } from "./MapSearchMyLocation";
import { useEffect, useState } from "react";
import { useContext } from "react";
import Contexto from "../Contexto";

export default () => {
  const { id } = useParams();
  const API_URL = "http://localhost:3000/api";
  const redirect = useNavigate();
  const { loguejat } = useContext(Contexto);
  if (!loguejat) {
    redirect("/login");
  }
  const [loading, setLoading] = useState(true);
  const [activitat, setActivitat] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    latitud: "",
    longitud: "",
    ubicacion: "",
    poblacion: "",
    comarca: "",
    temporada_id: "",
  });
  useEffect(() => {
    fetch(`${API_URL}/actividades/` + id)
      .then((resp) => resp.json())
      .then((data) => setActivitat(data))
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
  }, [id]);
  const [currentPosition, setCurrentPosition] = useState({
    lat: "",
    lon: "",
  });
  const [formulario, setFormulario] = useState({
    nombre: "",
    categoria: "",
    descripcion: "",
    latitud: "",
    longitud: "",
    ubicacion: "",
    poblacion: "",
    comarca: "",
    temporada_id: "",
  });

  useEffect(() => {
    setCurrentPosition({
      lat: activitat.latitud,
      lon: activitat.longitud,
    });
    setFormulario({
      nombre: activitat.nombre,
      categoria: activitat.categoria,
      descripcion: activitat.descripcion,
      latitud: activitat.latitud,
      longitud: activitat.longitud,
      ubicacion: activitat.ubicacion,
      poblacion: activitat.poblacion,
      comarca: activitat.comarca,
      temporada_id: activitat.temporada_id,
    });
  }, [activitat]);
  const editarDades = (e) => {
    e.preventDefault();
    console.log(formulario);
    const credenciales = {
      ...formulario,
    };
    console.log(credenciales);
    fetch(API_URL + "/activitats/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${loguejat.token}`,
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
    return <div>Cargando...</div>;
  }
  return (
    <div>
      <h1>Editar Activitat</h1>
      <div className="flex flex-col justify-between p-4 bg-white rounded-lg shadow-md">
        <div className="flex flex-col space-y-4">
          <h1 className="text-2xl font-semibold text-center">Actividad</h1>
          <hr className="my-4" />
          <form onSubmit={editarDades}>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Nombre</h2>
              <input
                type="text"
                name="nombre"
                value={formulario.nombre}
                onChange={(e) =>
                  setFormulario({ ...formulario, nombre: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Categoría</h2>
              <input
                type="text"
                name="categoria"
                value={formulario.categoria}
                onChange={(e) =>
                  setFormulario({ ...formulario, categoria: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Descripción</h2>
              <input
                type="text"
                name="descripcion"
                value={formulario.descripcion}
                onChange={(e) =>
                  setFormulario({ ...formulario, descripcion: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Ubicación</h2>
              <input
                type="text"
                name="ubicacion"
                value={formulario.ubicacion}
                onChange={(e) =>
                  setFormulario({ ...formulario, ubicacion: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Población</h2>
              <input
                type="text"
                name="poblacion"
                value={formulario.poblacion}
                onChange={(e) =>
                  setFormulario({ ...formulario, poblacion: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Comarca</h2>
              <input
                type="text"
                name="comarca"
                value={formulario.comarca}
                onChange={(e) =>
                  setFormulario({ ...formulario, comarca: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Temporada</h2>
              <select
                name="temporada_id"
                value={formulario.temporada_id}
                onChange={(e) =>
                  setFormulario({ ...formulario, temporada_id: e.target.value })
                }
              >
                {temporadas.map((temporada) => (
                  <option key={temporada.id} value={temporada.id}>
                    {temporada.nombre}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Latitud</h2>
              <input
                type="text"
                name="latitud"
                value={formulario.latitud}
                onChange={(e) =>
                  setFormulario({ ...formulario, latitud: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Longitud</h2>
              <input
                type="text"
                name="longitud"
                value={formulario.longitud}
                onChange={(e) =>
                  setFormulario({ ...formulario, longitud: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between">
              <h2 className="text-xl font-medium mb-2 md:mb-0">Imagen</h2>
              <input
                type="text"
                name="imagen"
                value={formulario.imagen}
                onChange={(e) =>
                  setFormulario({ ...formulario, imagen: e.target.value })
                }
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
