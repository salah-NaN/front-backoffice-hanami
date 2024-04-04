import { useState } from 'react'
import { Outlet, Link } from 'react-router-dom'
import Header from './components/Header'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className='bg-cream-body min-h-screen'>
    <Header></Header>
     <div className=' flex flex-row gap-2 '>
      <Link to="/login" className='rounded-md border'>Login</Link>
      <Link to="/register" className='rounded-md border'>Register</Link>
      
     </div>
     <div className='w-full '>
      <Outlet/>
     </div>
    </div>
  )
}

export default App
