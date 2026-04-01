import { useState, useEffect } from "react"
import { getPosts } from "../utils/queries"
import Post from "./Post"
import LoadingIndicator from "./LoadingIndicator"

const Posts = () => {

  const [posts, setPosts] = useState([]); 
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
      getPosts(setPosts, setLoading)
    }, [])

  function renderPosts() {
    let postsCards = []
    postsCards = posts.map(post => {
      return <Post post={post} />
    })

    return postsCards
  }

  if(loading){
    return <LoadingIndicator />
  }

  return (
    <div className="flex flex-col" >
        {
          renderPosts()
        }
    </div>
  )
}

export default Posts