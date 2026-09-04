import { likePost, unlikePost } from "../api/postview.api"

export async function likePostAction(setPost, postId, loggedUserId) {
    setPost(prev => {
        return {
            ...prev, 
            likedBy: [...prev.likedBy, {likedById: loggedUserId}]
        }
    })
    try {
        await likePost(postId)
    } catch{
        setPost(prev => {
            return {
                ...prev, 
                likedBy: prev.likedBy.filter(user => user.likedById !== loggedUserId)
            }
        })
    }
}

export async function unlikePostAction(setPost, postId, loggedUserId) {
    setPost(prev => {
        return {
            ...prev, 
            likedBy: prev.likedBy.filter(user => user.likedById !== loggedUserId)
        }
    })
    try {
        await unlikePost(postId)
    } catch{
        setPost(prev => {
            return {
                ...prev, 
                likedBy: [...prev.likedBy, {likedById: loggedUserId}]
            }
        })
    }
}