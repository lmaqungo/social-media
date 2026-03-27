import { Link } from "react-router"
import LogoutIconDefault from "../../icons/navigation/LogoutIconDefault"
import LogoutIconActive from "../../icons/navigation/LogoutIconActive"

const Logout = ({ isActive, handleClick, id }) => {
  return (
    <>
        <Link to='/logout'  >
            <div onClick={() => handleClick(id)} className='transition p-3 lg:py-3 lg:pl-3 lg:pr-6 rounded-full flex items-center gap-6 hover:bg-hover-grey' >
                {
                    isActive ? <LogoutIconActive /> : <LogoutIconDefault />
                }
                <p className={`${isActive && 'font-bold'} hidden lg:block text-2xl text-nowrap `}>Log out</p>
            </div>
        </Link>
    </>
  )
}

export default Logout