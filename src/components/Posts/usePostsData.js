
import { apiURL } from "../../utils/selectdb";
import useData from "../../hooks/useData";

export default function usePostsData(){

    const url = `${apiURL}/posts`

    const { data: posts, loading } = useData(url)

    return { posts, loading }
}