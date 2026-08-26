import Post from "../Post"
import LoadingIndicator from "../LoadingIndicator"
import usePostsData  from "./usePostsData"

const Posts = () => {

  const { posts, loading } = usePostsData()

  if(loading){
    return <LoadingIndicator />
  }

  return (
    <div className="flex flex-col" >
        {
          posts.map(post => <Post post={post} />)
        }
    </div>
  )
}

export default Posts