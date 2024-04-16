import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import Cookie from "js-cookie";

const API_URL = "http://localhost:3000/api/";

export default function PuntosInteresPropietario() {
  const { loguejat } = useContext(Contexto);
  const navigate = useNavigate();

  const [puntos, setPuntos] = useState([]);
  const clienteId = loguejat?.cliente_id;

  useEffect(() => {
    const fetchPuntos = async () => {
      if (!clienteId) {
        return;
      }

      try {
        const response = await fetch(
          API_URL + "puntos_interes_propietarios/" + clienteId
        );
        const data = await response.json();
        setPuntos(data);
      } catch (err) {
        console.error("Error puntos:", err);
      }
    };

    fetchPuntos();

    return () => {};
  }, [clienteId]);

  return (
    <div>
      {puntos.length > 0 ? (
        puntos.map((punto) => (
          <div key={punto.id} className="border-none w-full col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2 h-64">
            <p>{punto.nombre}</p>

          </div>
        ))
      ) : (
        <p>Cargando puntos de interés...</p>
      )}
    </div>
  );
}
