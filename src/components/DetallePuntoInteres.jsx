import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import PuntoInteres from "./PuntInteres";
import Actividad from "./Activitats";
import Flor from "./Flor";
import { redirect, useNavigate } from "react-router-dom";


const API_URL = "http://localhost:3000/api";

const DetallePuntoInteres = () => {

  const redirect = useNavigate();

  const { id } = useParams();
  const [puntosInteres, setPuntosInteres] = useState({});
  const [actividades, setActividades] = useState([]);
  const [flor, setFlor] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/punto_interes_page/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setPuntosInteres(data);
        setActividades(data.temporadas.map((temporada) => temporada.actividades).flat());
      })
      .catch((err) => console.log(err));

  }, [id]);

  useEffect(() => {
    const fetchFlowers = async () => {
      const temporadas = puntosInteres.temporadas || [];
      const uniqueFlowerIds = new Set(temporadas.map((temporada) => temporada.flor_id));
      const uniqueFlowerIdsArray = Array.from(uniqueFlowerIds);
      const fetchPromises = uniqueFlowerIdsArray.map(async (flor_id) => {
        try {
          const response = await fetch(`${API_URL}/flores/imagenes/temporada/${flor_id}/${id}`);
          const data = await response.json();
          return data;
        } catch (error) {
          console.error("Error fetching data:", error);
          return null;
        }
      });
      const fetchedFlowers = await Promise.all(fetchPromises);
      const filteredFlowers = fetchedFlowers.filter((flower) => flower !== null);
      setFlor(filteredFlowers);
    };
    fetchFlowers();
  }, [id, puntosInteres.temporadas]);

  if (!puntosInteres.nombre || !actividades.length || !flor.length) {
    return <div className="text-center p-4">Loading...</div>;
  }

  return (
    <div className="detalle-punto-interes">
      <PuntoInteres puntosInteres={puntosInteres} />
      <div className="flex justify-center p-4 bg-gray-100 rounded-lg shadow-md dark:bg-gray-800">
          <Link to={`/editarPuntInteres/${id}`} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold rounded-md">Editar</Link>
        </div>
      <hr className="w-full my-8 border-gray-200 " />
      <div className="actividades">
        <h1 className="text-2xl font-semibold text-center">Actividades</h1>
        {actividades.map((actividad) => (
          <Actividad key={actividad.id} actividad={actividad} idPuntInteres={id} flor={flor} />
        ))}
        
        <div className="flex justify-center p-4 bg-gray-100 rounded-lg shadow-md">
          <Link to={`/afegirActivitat/${id}`} className="px-4 py-2 bg-indigo-500 hover:bg-indigo-700 text-white font-semibold rounded-md">Crear Actividad</Link>
        </div>
      </div>
      <div className="flores">
        <h1 className="text-2xl font-semibold text-center">Flores</h1>
        {flor.map((f) => (
          <Flor key={f.id} flor={f} />
        ))}
      </div>
    </div>
  );
};

export default DetallePuntoInteres;
