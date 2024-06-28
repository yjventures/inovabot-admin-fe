import AuthButton from '@/components/Auth/AuthButton'
import ImagePart from '@/components/Auth/ImagePart'
import InputField from '@/components/Auth/InputField'
import { useSidebarStore } from '@/store/store'
import { NavLink } from 'react-router-dom'


const Register = () => {

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
        <h1 className='text-light-headingText dark:text-dark-headingText font-semibold text-[24px]'>Welcome to Inova!</h1>
        <p className=' text-light-normalText dark:text-dark-normalText mt-2'
          onClick={() => {
            console.log('clicked')
            setDarkMode(!darkMode)
          }}
        >
          Register now and start your adventure.
        </p>
        <div className='w-full max-w-[650px]'>
          <div className=' grid grid-cols-2 gap-4'>
            {/* username / email */}
            <InputField label='Name' type='text' placeholder='Your name. . .' name='name' />
            <InputField label='Username' type='text' placeholder='Your username. . .' name='username' />
          </div>
          {/* email */}
          <InputField label='Email' type='email' placeholder='Your email. . .' name='email' />
          <InputField label='Password' type='password' placeholder='Your password. . .' name='password' />
          {/* login */}
          <AuthButton text='Register' />

          <p className='text-light-normalText dark:text-dark-normalText text-center my-2'>Don't have an account? <NavLink to='/login' className='text-light-headingText dark:text-dark-headingText underline font-bold'>Login</NavLink></p>
        </div>

      </div>
    </div>
  )
}

export default Register