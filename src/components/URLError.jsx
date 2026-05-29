import React from 'react'
import BrainIcon from '../icons/BrainIcon'
import { Link } from 'react-router'

const URLError = () => {
  return (
    <div className='h-screen flex items-center justify-center bg-black sm:bg-gray-600' >
        <div className='bg-black sm:px-21 sm:py-12 rounded-xl' >
            <div className='flex flex-col items-center gap-12 text-white ' >
                <BrainIcon />
                <div className='flex flex-col gap-4 sm:gap-8 items-center ' >
                    <h1 className='font-bold text-2xl sm:text-4xl' >Error</h1>
                    <p className='font-medium text-lg' >This page does not exist :/</p>
                    <Link to='/' className='bg-white text-black self-stretch text-center text-2xl font-bold rounded-full p-3 transition hover:bg-hover-white ' >Return Home</Link>
                </div>
            </div>
        </div>
    </div>
  )
}

export default URLError