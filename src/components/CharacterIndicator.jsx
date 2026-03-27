import React from 'react'
import { useState, useEffect } from 'react'
import { CircularProgress } from '@mui/material'
import { createTheme, ThemeProvider } from '@mui/material/styles';


const CharacterIndicator = ({ postContent }) => {

    const theme = createTheme({
        palette: {
            default: {
                main: '#1DA1F2',
            },
            warning: {
                main: '#FFCE00',
            },
            error: {
                main: '#FF0000'
            }
        },
    });

    const characterLimit = 280 - postContent.length; 

    function calculateRadius() {
        if(characterLimit < 0){
            return 100
        }
        return Math.floor((postContent.length/280) * 100)
    }

    useEffect(() => {
        console.log(`characters: ${postContent.length}`)
    }, [postContent])

    function charLimColor(){
        if(characterLimit <= 10 && characterLimit > 0){
            return "text-yellow-300"
        } else if (characterLimit <= 0) {
            return "text-red-600"
        } else {
            return "text-twitter-light-grey"
        }
    }

    function circleColor(){
        if(characterLimit <= 10 && characterLimit > 0){
            return "warning"
        } else if (characterLimit <= 0) {
            return "error"
        } else {
            return "default"
        }
    }


  return (
    <div className='relative' >
        <ThemeProvider theme={theme} >
            <CircularProgress color={circleColor()} size={36} enableTrackSlot variant="determinate" value={calculateRadius()} />
        </ThemeProvider>
        <p className={ `${charLimColor()} select-none absolute top-2 left-3 text-sm ${characterLimit <= 10 ? 'block' : 'hidden'} ` } >{ characterLimit }</p>
    </div>
  )
}

export default CharacterIndicator