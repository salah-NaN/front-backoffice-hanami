import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Contexto from "../Contexto";
import Cookie from "js-cookie";

const API_URL = "http://localhost:3000/api/";

export default () => {
  const { loguejat } = useContext(Contexto);
  const navigate = useNavigate();

  const [puntos, setPuntos] = useState([]);
  const id = loguejat.cliente_id;
  console.log(loguejat.cliente_id);
  useEffect(() => {
    const options = {
      method: "GET",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const URL = API_URL + "puntos_interes_propietarios/" + loguejat.cliente_id;

    console.log(URL);

    fetch(URL, options)
      .then((resp) => resp.json())
      .then((data) => {
        setPuntos(data);
      })
      .catch((err) => console.log(err));
  }, []);
  console.log(puntos);
  return (
    <div>
      {puntos.map((punto) => (
        <div key={punto.id}>
          <p>{punto.ubicacion}</p>
        </div>
      ))}
    </div>
  );
};
