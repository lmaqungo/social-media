import { apiURL } from "../../../utils/selectdb";

export async function likePost(prevPost, setPost, postId){
    const url = `${apiURL}/posts/${postId}/like`; 
    try {
       const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
            setPost(prevPost)
        }
    }
}

export async function unlikePost(prevPost, setPost, postId){
    const url = `${apiURL}/posts/${postId}/unlike`; 
    try {
       const response = await fetch(url, {
            credentials: "include", 
            method: 'POST', 
            headers: {
                "Content-Type": "application/json",
            }
        }); 
        if(!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
    } catch(error) {
        if(error instanceof Error) {
            console.error(error)
        } else {
            console.log('An unexpected error has occurred')
            setPost(prevPost)
        }
    }
}