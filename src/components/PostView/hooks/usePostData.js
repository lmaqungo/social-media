import { apiURL } from "../../../utils/selectdb";
import { useState, useEffect } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";

export default function usePostData(postId){
    const url = `${apiURL}/posts/${postId}`; 

    const gf = new GiphyFetch('zdx9Wh2MzGXEPZtkKay4bSgXUbw4UXec');

    const [post, setPost] = useState({}); 
    const [gif, setGif] = useState(null);
    const [loading, setLoading] = useState(true); 
    
    useEffect(()=>{
        async function fetchPost(){
            try{
                const response = await fetch(url, {
                    credentials: "include", 
                    method: "GET", 
                    headers: {
                        "Content-Type": "application/json",
                    }
                })

                if(response.status >= 400) {
                    throw new Error(`Error status: ${response.status}`)
                }

                const result = await response.json()
                setPost(result)

            } catch(error) {
                if(error instanceof Error) {
                    console.error(error)
                } else {
                    console.log('An unexpected error has occurred')
                }
            } finally {
                setLoading(false)
            }
        }

        fetchPost()
    } , [])

    useEffect(() => {
        async function fetchGif(){
            if(post.gifId){
                const { data } = await gf.gif(post.gifId)
                setGif(data)
            } else {
                console.log('No gif found')
            }
        }
        if(post) {
            fetchGif()
        }
    }, [post])
    
    return { post, gif, setPost, loading }
}