import React from 'react'
import CancelIcon from '../icons/CancelIcon'
import { useState, useEffect } from 'react'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { Gif } from '@giphy/react-components'

const GIFPreview = ({ gifID, setGifID, setOpenGifSelector }) => {

    const gf = new GiphyFetch('zdx9Wh2MzGXEPZtkKay4bSgXUbw4UXec');

    const [gif, setGif] = useState(null); 

    useEffect(() => {
        async function fetchGif() {
            const { data } = await gf.gif(gifID)
            setGif(data)
        }
        fetchGif()
        setOpenGifSelector(false)
    }, [gifID])

    function removeGif(){
        setGifID(null)
    }

  return (
    <div className='flex gap-2 items-start'>
        {gif && <Gif gif={gif} noLink={true} hideAttribution={true} width={200} />}
        <CancelIcon action={removeGif} />
    </div>
  )
}

export default GIFPreview