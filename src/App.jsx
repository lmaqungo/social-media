import { useState } from 'react'
import { Outlet } from 'react-router'
import './emoji.css'

function App() {

  return (
    <div  className='min-h-screen bg-black text-white w-full'  >
      <Outlet />
    </div>
  )
}

export default App
