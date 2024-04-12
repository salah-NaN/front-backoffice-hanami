import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Contexto from "../Contexto";
import Cookie from "js-cookie";

const API_URL = "http://localhost:3000/api/";

const ObtenerPuntos = (clienteId) => {
    const [puntos, setPuntos] = useState([]);

    useEffect(() => {
        const options = {
            method: 'GET',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
        };

        fetch(API_URL + 'puntos_interes_propietarios/' + clienteId, options)
            .then(resp => resp.json())
            .then(data => {
                setPuntos(data);
            })
            .catch(err => console.log(err));
    }, []); // El segundo argumento como un array vacío hace que se ejecute solo una vez

    return puntos;
};

export default () => {
    const { loguejat } = useContext(Contexto);
    const navigate = useNavigate();
    
    console.log(loguejat.cliente_id);
    const puntos = ObtenerPuntos(loguejat.cliente_id);
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
