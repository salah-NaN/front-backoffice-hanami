import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';
import Contexto from "../Contexto";

const API_URL = "/api";


export default () => {
    const {loguejat, setLoguejat} = useContext(Contexto)

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const redirect = useNavigate();

    const loguea = (e) => {
        e.preventDefault();

    const credenciales = {
        email,
        password
    }
    console.log(credenciales)

    const opciones = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credenciales)
    }

    fetch(API_URL+'/login', opciones)
    .then(resp => resp.json())
    .then(data => {
        //console.log("resp", data);
        if (!data.error){
            console.log(data);
            setLoguejat(data)
            redirect('/Home') 
        }
        
    })
    .catch(err => console.log(err))


}


    return (
        <div className="mt-4 md:w-1/3 mx-auto">
            <form onSubmit={loguea} className="m-8 p-4 border rounded-md">

                <h1 className=' p-4 text-center'>Login</h1>

                <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="email"> Email</label>
                <input onInput={(e) => setEmail(e.target.value)}
 value={email} className="shadow border rounded w-full py-2 px-3 text-gray-700 " id="email" type="text" placeholder="email" />
            </div>
            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input  onInput={(e) => setPassword(e.target.value)}
            value={password} className="shadow appearance-none border
                rounded w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="******************" />
            </div>
  


            <div className='flex flex-row gap-4 justify-center'>
                <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Entrar
                </button>
                <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>redirect('/login')}>
                    Registrar
                </button>
            </div>
            </form>
        </div>
    )

}



/* 

    const logueja = (e) => {

        e.preventDefault();

    const credenciales = {
        nombre,
        apellidos,
        email,
        password
    }

    const opciones = {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json'
          },
        body: JSON.stringify(credenciales)
    }

    fetch(API_URL+'propietarios/login', opciones)
    .then(resp => resp.json())
    .then(data => {
        //console.log("resp", data);
        if (!data.error){
            setLoguejat(data)
            redirect('/miperfil')
        }
        
    })
    .catch(err => console.log(err))

}

*/