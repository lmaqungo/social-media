import { useState, useEffect } from "react";
import { GiphyFetch } from "@giphy/js-fetch-api";
import { fetchPost } from "../api/postview.api";



export default function usePostData(postId){
    
    const gf = new GiphyFetch('zdx9Wh2MzGXEPZtkKay4bSgXUbw4UXec');

    const [post, setPost] = useState({}); 
    const [gif, setGif] = useState(null); 
    const [loading, setLoading] = useState(true); 
    
    useEffect(()=>{
        fetchPost(postId).then(post => {
            setPost(post); 
            if(post.gifId) {
                gf.gif(post.gifId).then(({ data }) => {
                    setGif(data)
                }
                    
                )
            }
            setLoading(false)
        })
    } , [])

    return { post, gif, setPost, loading }
}