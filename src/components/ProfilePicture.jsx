import Circle from '../icons/Circle'

const ProfilePicture = ({ user, size }) => {

    if(user.displayPictureUrl){
        // {console.log(user.displayPictureUrl)}
        return(
            <>
                <div >
                    <img referrerpolicy="no-referrer" className={`rounded-full`} src={user.displayPictureUrl} width={size} height={size} alt="" />
                </div>
            </>
        )
    } else{
        return <Circle size={size} />
    }
}

export default ProfilePicture