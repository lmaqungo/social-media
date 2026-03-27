
import { Link } from "react-router"
import { useNavigate } from "react-router"


const BackIcon = ({ type='default', action }) => {

  const navigate = useNavigate()

  /* 
  Maybe bring back the navigate(-1) once the app is in production, not
  going through constant changes
  */

  if(type === 'default'){
    return (
      <>
        <Link to='/' >
            <svg className="cursor-pointer transition p-2 size-10 rounded-full hover:bg-hover-grey " xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#FFFFFF"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
        </Link>
      </>
    )
  } else if (type == 'custom') {
    return (
      <>
        <svg onClick={action} className="cursor-pointer transition p-2 size-10 rounded-full hover:bg-hover-grey " xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"  fill="#FFFFFF"><path d="m313-440 224 224-57 56-320-320 320-320 57 56-224 224h487v80H313Z"/></svg>
      </>
    )
  }




}

export default BackIcon