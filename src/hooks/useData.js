import { useState, useEffect } from 'react'

export default function useData(url){
    const [data, setData] = useState(null); 
    const [loading, setLoading] = useState(true); 

    useEffect(()=>{
        fetch(url, {
            credentials: "include", 
            method: "GET", 
            headers: {
                "Content-Type": "application/json",
            }
        }).then((response) => {
            if(response.status >= 400){
                throw new Error(`Error status: ${response.status}`)
            }
            return response.json()
        })
        .then((response) => setData(response))
        .catch((error) => {
            if(error instanceof Error) {
                console.error(error)
            } else {
                console.log('An unexpected error has occurred')
            }
        })
        .finally(() => setLoading(false) )
    } , [])

    return { data, loading }
}