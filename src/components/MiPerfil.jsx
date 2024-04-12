import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import Contexto from "../Contexto";

import { redirect } from 'react-router-dom';

export default () => {
    const redirect = useNavigate();
    const {loguejat} = useContext(Contexto)
    console.log(loguejat)
    return (
        <div>mi perfil
        <button onClick={()=>redirect('/home')}>Puntos Interes</button>

        </div>
    )
}