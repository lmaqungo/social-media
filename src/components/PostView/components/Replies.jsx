import Reply from "./Reply"
import LoadingIndicator from "../../LoadingIndicator"

const Replies = ({ replies, repliesLoading }) => {
    if(repliesLoading){
        <div>
           <LoadingIndicator/> 
        </div>
    }
  return (
    <div>
        {
            replies.map(reply => <Reply key={reply.id} reply={reply} />)
        }
    </div>
  )
}

export default Replies