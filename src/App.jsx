import { useState,useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Contexto from "./Contexto"
import Cookie from "js-cookie"
import Header from './components/Header'
import './App.css'

const API_URL = 'http://localhost:3000/api';


function App() {
  const redirect = useNavigate();
  

   const logout = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"; // Set the expiration date to a past date
    setLoguejat(null)
    window.location.href = "/login";
  }; 

  useEffect(() => {
    if(document.cookie.includes('token')){
      const token = Cookie.get("token")
      const payload = JSON.parse(atob(token.split(".")[1]))
      const data = {
        ...payload,
        token:token,
      }
      if (!data.error){
        console.log(data);
        setLoguejat(data)
      }else{
        setLoguejat(false);
        redirect("/propietarios/login")
      }
      
    }  
  }, [])

  const [loguejat, setLoguejat] =useState(false)

  const datos = {loguejat, setLoguejat, logout, API_URL}

  return (
    <Contexto.Provider value={datos}>
    <div className='bg-cream-body min-h-screen'>
    <Header></Header>
     <div className=' flex flex-row gap-2 '>
      <Link to="/login" className='rounded-md border'>Login</Link>
      <Link to="/register" className='rounded-md border'>Register</Link>
      <button onClick={logout}>Logout</button>

     </div>
     <div className='w-full '>
      <Outlet/>
     </div>
    </div>
    </Contexto.Provider>
  )
}

export default App
