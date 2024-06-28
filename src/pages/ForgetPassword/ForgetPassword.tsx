import AuthButton from '@/components/Auth/AuthButton'
import ImagePart from '@/components/Auth/ImagePart'
import InputField from '@/components/Auth/InputField'
import { useSidebarStore } from '@/store/store'
import { NavLink } from 'react-router-dom'


const ForgetPassword = () => {

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
                <h1 className='text-light-headingText dark:text-dark-headingText font-semibold text-[24px]'>Forgot Password</h1>
                <p className=' text-light-normalText dark:text-dark-normalText mt-2 max-w-[650px] text-center'
                    onClick={() => {
                        console.log('clicked')
                        setDarkMode(!darkMode)
                    }}
                >
                    Enter the email address you used when joined and we’ll send reset instructions to reset your password.
                </p>
                <div className='w-full max-w-[650px]'>
                    {/* username / email */}
                    <InputField label='Email' type='email' placeholder='Your email. . .' name='email' />

                    {/* login */}
                    <AuthButton text='Send Reset Instuctions' />

                    <p className='text-light-normalText dark:text-dark-normalText mt-6 text-center'>Back to log in page? <NavLink to='/login' className='text-light-headingText dark:text-dark-headingText underline font-bold'>Back Now</NavLink></p>

                </div>

            </div>
        </div>
    )
}

export default ForgetPassword