import { useState, useEffect } from "react"
import { getPosts } from "../utils/queries"
import Post from "./Post"
import { useOutletContext } from "react-router"

const Posts = () => {

  const [posts, setPosts] = useState([]);

  useEffect(() => {
      getPosts(setPosts)
    }, [])

  function renderPosts() {
    let postsCards = []
    postsCards = posts.map(post => {
      return <Post post={post} />
    })

    return postsCards
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