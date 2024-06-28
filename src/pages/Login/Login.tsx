import AuthButton from '@/components/Auth/AuthButton'
import ImagePart from '@/components/Auth/ImagePart'
import InputField from '@/components/Auth/InputField'
import { useSidebarStore } from '@/store/store'
import { NavLink } from 'react-router-dom'


const Login = () => {

  const darkMode = useSidebarStore(state => state.darkMode)
  const setDarkMode = useSidebarStore(state => state.setDarkMode)
  // console.log(darkMode)

  return (
    <div className="py-8 px-6 grid sm:grid-cols-2 grid-cols-1 gap-4 font-publicSans min-h-dvh bg-light-sidebar dark:bg-dark-sidebar">
      {/* left side */}
      <ImagePart />

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
        <div className='w-full max-w-[650px]'>
          {/* username / email */}
          <InputField label='Username/email' type='text' placeholder='Your username or email. . .' name='username' />
          {/* email */}
          <InputField label='Password' type='password' placeholder='Your password. . .' name='password' />
          {/* login */}
          <AuthButton text='Login' />

          <div className='flex justify-between items-center w-full mt-4'>
            {/* register */}
            <p className='text-light-normalText dark:text-dark-normalText'>Don't have an account? <NavLink to='/register' className='text-light-headingText dark:text-dark-headingText underline font-bold'>Register</NavLink></p>

            {/* forget password */}
            <div className='text-light-normalText' >
              <NavLink to="/forget-password" className='text-light-normalText underline'>Forget password?</NavLink>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login