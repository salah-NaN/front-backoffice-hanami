import { useState, useContext } from "react";
import { useNavigate } from 'react-router-dom';

const API_URL = "http://localhost:3000/api";


export default () => {
    const [email, setEmail] = useState("");
    const [nombre, setNombre] = useState("");
    const [apellidos, setApellidos] = useState("");
    const [password, setPassword] = useState("");

    const redirect = useNavigate();

    const registra = (e) => {
        e.preventDefault();
    
        //console.log("loguejant..", email, password)
    
        const credenciales = {
          nombre,
          apellidos,
          email,
          password,
        };
    
        const opciones = {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credenciales),
        };
    
        fetch(API_URL + "/propietarios/register", opciones)
          .then((resp) => resp.json())
          .then((data) => {
            console.log("resp", data);
                if (!data.error){
                    redirect('/login')
                }
          })
          .catch((err) => console.log(err));
      };
    
    return (
        <div className="mt-4  ">
        <form onSubmit={registra} className="m-8 p-4 border rounded-md">

            <h1 className='p-4 text-center'>Registrar</h1>

            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold" htmlFor="email"> Email</label>
                <input onInput={(e) => setEmail(e.target.value)}
 value={email} className="shadow border rounded w-full py-2 px-3 text-gray-700 " id="email" type="text" placeholder="email" />
            </div>
            <div>
                <label className=" text-gray-700 text-sm font-bold mb-2" htmlFor="name">Nombre</label>
                <input onInput={(e) => setNombre(e.target.value)}
            value={nombre} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="nombre"
                    placeholder="Nombre"
                />
            </div>
            <div>
                <label  className=" text-gray-700 text-sm font-bold mb-2" htmlFor="lastname">Apellidos</label>
                <input value={apellidos} onInput={(e) => setApellidos(e.target.value)} type="text" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="apellidos"
                    placeholder="Apellidos"
                />
            </div>

            <div className="">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                    Password
                </label>
                <input  onInput={(e) => setPassword(e.target.value)}
            value={password} v className="shadow appearance-none border
                rounded w-full py-2 px-3 text-gray-700 mb-3 " id="password" type="password" placeholder="******************" />
            </div>
  


            <div className='flex flex-row gap-4 justify-center'>
                <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Entrar
                </button>
                <button className="shadow-md shadow-neutral-800 bg-emerald-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={()=>redirect('/login')}>
                    To login
                </button>
            </div>

        </form>
    </div>
    )

}