import { useState,useEffect } from 'react'
import { Outlet, Link, useNavigate } from 'react-router-dom'
import Contexto from "./Contexto"
import Cookie from "js-cookie"
import Header from './components/Header'
import Footer from './components/Footer'
import './App.css'

const API_URL = 'http://localhost:3000/api';


function App() {
  const redirect = useNavigate();
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

  const datos = {loguejat, setLoguejat, API_URL}

  return (
    <Contexto.Provider value={datos}>
    <div className='bg-cream-body min-h-screen'>
    <Header/> 
     <div className='w-full '>
      <Outlet/>
     </div>
     <Footer/>
    </div>
    </Contexto.Provider>
  )
}

export default App
