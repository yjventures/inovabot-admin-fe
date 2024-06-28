
import AuthButton from '@/components/Auth/AuthButton'
import ImagePart from '@/components/Auth/ImagePart'
import InputField from '@/components/Auth/InputField'
import { useSidebarStore } from '@/store/store'
import { NavLink } from 'react-router-dom'


const ResetPassword = () => {

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
                <h1 className='text-light-headingText dark:text-dark-headingText font-semibold text-[24px]'>Reset Password</h1>

                <div className='w-full max-w-[650px]'>
                    {/* username / email */}
                    <InputField label='New Password' type='password' placeholder='Your new password. . .' name='password' />
                    <InputField label='Confirm Password' type='password' placeholder='confirm your password. . .' name='password' />

                    {/* login */}
                    <AuthButton text='Reset Password' />
                    <p className='text-light-normalText dark:text-dark-normalText mt-6 text-center'>Back to log in page? <NavLink to='/login' className='text-light-headingText dark:text-dark-headingText underline font-bold'>Back Now</NavLink></p>

                </div>

            </div>
        </div>
    )
}

export default ResetPassword