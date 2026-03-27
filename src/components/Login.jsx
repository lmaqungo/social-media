import GoogleIcon from '../icons/GoogleIcon'
import BrainIcon from '../icons/BrainIcon'

const Login = () => {

  return (
    <div className='w-full h-screen flex items-center justify-center bg-black sm:bg-gray-600 ' >
        <div className='bg-black p-12 rounded-xl ' >
            <div className='flex flex-col items-center gap-12' >
                <BrainIcon />
                <div className='flex flex-col gap-8 items-center '>
                    <h1 className='text-3xl font-bold' >Join Today</h1>
                    <div className='flex flex-col gap-4' >
                        <a href='http://localhost:3000/auth/google' className='transition bg-white py-3 px-5 flex gap-2 items-center rounded-xl cursor-pointer hover:bg-hover-white'>
                            < GoogleIcon />
                            <p className='text-black font-bold' >Continue with Google</p>
                        </a>
                        <a href='http://localhost:3000/auth/guest' className='border text-center border-white py-3 px-5 rounded-xl cursor-pointer' >
                            <p className='font-bold' >Continue as guest</p>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Login