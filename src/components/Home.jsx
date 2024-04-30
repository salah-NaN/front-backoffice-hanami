import React, { useState, useEffect, useContext } from "react";
import { redirect, useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import Cookie from "js-cookie";

const API_URL = "/api/";

export default function PointsOfInterest() {
  const redirect = useNavigate();
  const { loguejat } = useContext(Contexto);
  const [points, setPoints] = useState([]);
  const clientId = loguejat?.propietario_id;

  useEffect(() => {
    const fetchPoints = async () => {
      if (!clientId) return;

      try {
        const response = await fetch(`${API_URL}puntos_interes_propietarios/${clientId}`);
        const data = await response.json();
        console.log(data)

        setPoints(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPoints();
  }, [clientId]);

  return (
    <div>
      {points.length > 0 ? (
        points.map((point) => (
          <div key={point.id} onClick={() => redirect(`/PuntInteres/${point.id}`)} className="border-none w-full col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2 h-64">
            <p>{point.nombre}</p>
          </div>
        ))
      ) : (
        <p>Loading points of interest...</p>
      )}
      
      <button onClick={() => redirect("/afegirPuntInteres")}>Add Point of Interest</button>

    </div>
  );
}
