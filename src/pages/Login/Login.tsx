import loginImage from '@/assets/images/background.png'
import { useSidebarStore } from '@/store/store'
import { NavLink } from 'react-router-dom'

const Login = () => {

  const darkMode = useSidebarStore(state => state.darkMode)
  const setDarkMode = useSidebarStore(state => state.setDarkMode)
  console.log(darkMode)
  return (
    <div className="py-8 px-6 grid sm:grid-cols-2 grid-cols-1 gap-4 font-publicSans min-h-dvh bg-light-sidebar dark:bg-dark-sidebar">
      {/* left side */}
      <div className='hidden sm:block'>
        <img src={loginImage} className='max-h-[90vh] w-full object-cover rounded-md' alt="login-image" />
      </div>

      {/* right side */}
      <div className=' flex justify-center items-center flex-col'>
        {/* title */}
        <h1 className='text-light-headingText dark:text-dark-headingText font-semibold text-[24px]'>Welcome Back!</h1>
        <p className=' text-light-normalText dark:text-dark-normalText mt-2'
          onClick={() => {
            console.log('clicked')
            setDarkMode(!darkMode)
          }}
        >
          Welcome back, please enter your details.
        </p>
        {/* username / email */}
        <div className='w-full md:w-4/5 text-light-normalText mt-6'>
          <label htmlFor="name" className="block text-sm font-medium leading-6">
            Username/email
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full rounded-md py-1.5 shadow-sm placeholder:text-gray-400 outline-none px-4 sm:text-sm sm:leading-6 border-[1px]"
              placeholder="Your username/email. . ."
            />
          </div>
        </div>

        {/* email */}
        <div className='w-full md:w-4/5 text-light-normalText mt-4'>
          <label htmlFor="password" className="block text-sm font-medium leading-6">
            Password
          </label>
          <div className="mt-1">
            <input
              type="password"
              name="password"
              id="email"
              className="block w-full rounded-md py-1.5 shadow-sm outline-none placeholder:text-gray-400 px-4 sm:text-sm sm:leading-6 border-[1px]"
              placeholder="Your password. . ."
            />
          </div>
        </div>



        {/* login */}
        <button className=' bg-light-loginButtonBackground dark:bg-dark-loginButtonBackground text-light-loginButtonText dark:text-dark-loginButtonText w-full md:w-4/5 p-2 rounded-md mt-4'>
          Login
        </button>

        <div className='flex justify-between items-center w-full md:w-4/5 mt-4'>
          {/* register */}
          <div>
            <p className='text-light-normalText dark:text-dark-normalText'>Don't have an account? <NavLink to='/register' className='text-light-headingText dark:text-dark-headingText underline font-bold'>Register</NavLink></p>
          </div>

          {/* forget password */}
          <div className='text-light-normalText' >
            <NavLink to="" className='text-light-normalText underline'>Forget password?</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login