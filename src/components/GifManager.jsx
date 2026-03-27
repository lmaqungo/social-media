import { Grid, Gif } from '@giphy/react-components'
import { GiphyFetch } from '@giphy/js-fetch-api'
import { useState, useEffect } from 'react'
import LoadingIndicator from './LoadingIndicator'


const GifManager = ({ setGifID }) => {

  const gf = new GiphyFetch('zdx9Wh2MzGXEPZtkKay4bSgXUbw4UXec')

  const [gifs, setGifs] = useState(null); 
  const [searchInput, setSearchInput] = useState(''); 
  const [loading, setLoading] = useState(false);

  
  useEffect(() => {
    async function fetchGifs(){
        const { data }  = await gf.trending({ limit: 10 })
        setGifs(data)
    }
    fetchGifs()
  }, [])

  useEffect(() => {
    console.log('gifs result: ')
    console.log(gifs)
  }, [gifs])

  function renderGifs(){
    return gifs.map(data=>
      <div className='cursor-pointer h-fit' >
        <Gif gif={data} noLink={true} hideAttribution={true} onGifClick={(gifObj) => setGifID(gifObj.id) } />
      </div>
    )
  }


  async function handleSubmit(e){
    setLoading(true)
    e.stopPropagation();
    e.preventDefault();
    if(searchInput.length > 0){
      const { data }  = await gf.search(searchInput, { limit: 10, sort:'relevant' })
      setGifs(data)
    } else {
      const { data }  = await gf.trending({ limit: 10 })
        setGifs(data)
    }
    setLoading(false)
  }

  function handleTyping(e){
    setSearchInput(e.target.value)
  }

  function loadingScreen(){
    return(
      <div className='w-full h-full flex justify-center items-center' >
        <LoadingIndicator />
      </div>
    )
  }

  return (
    <>
        <div className="max-h-100 overflow-auto p-2 border rounded-sm border-twitter-blue absolute top-1/3 left-0 sm:left-2/7 md:left-2/6 lg:left-2/5 w-screen sm:w-md lg:w-xl flex flex-col gap-2 " >
              <form onSubmit={handleSubmit} className='flex grow' >
                <input onChange={handleTyping} className={`text-white grow rounded-full pl-4 py-2 bg-dark-grey-alternate-2 focus:bg-black focus:outline focus:outline-twitter-blue `} type="text" placeholder='Search GIF'/>
              </form>
            <div className='grid grid-cols-3 gap-2' >
              {
                loading ? loadingScreen() : gifs && renderGifs()
              }
            </div>
        </div>
    </>
  )
}

export default GifManager