
import { Link } from "react-router"

const BackIcon = () => {
  return (
    <>  

        <Link to='/' >
            <svg className="transition p-2 size-10 rounded-full hover:bg-hover-grey " xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#FFFFFF"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </Link>
    </>
  )
}

export default BackIcon