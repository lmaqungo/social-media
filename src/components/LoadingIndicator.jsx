import React from 'react'
import { CircularProgress } from '@mui/material'

const LoadingIndicator = () => {
  return (
        <div className='w-full h-full py-10 flex justify-center items-center' >
            <CircularProgress size={24} />
        </div>
  )
}

export default LoadingIndicator