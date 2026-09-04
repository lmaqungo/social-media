
import { useState, useEffect } from "react";

import client from "../../api/client";

const fetchPosts = () => client('/posts')

export default function usePostsData(){

    const [posts, setPosts] = useState([]); 
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPosts().then(result => {
            setPosts(result)
            setLoading(false)
        })
    }, [])

    return { posts, loading }
}