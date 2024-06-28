
const AuthButton = ({text}: {text: string}) => {
    return (
        <button className='bg-light-loginButtonBackground dark:bg-dark-loginButtonBackground text-light-loginButtonText dark:text-dark-loginButtonText w-full p-2 rounded-md mt-4'>
            {text}
        </button>
    )
}

export default AuthButton