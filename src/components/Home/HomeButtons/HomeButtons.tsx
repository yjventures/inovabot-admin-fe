import { CommandLineIcon, EyeIcon, PlusIcon } from "@heroicons/react/24/outline"
import { useNavigate } from "react-router-dom"

interface ButtonInterface {
    title: string,
    link: string,
    color: string,
    textColor: string
}

const HomeButtons = () => {


    const buttons: ButtonInterface[] = [
        {
            title: 'Create a Bot',
            link: '/create-bot',
            color: '#D594C6',
            textColor: 'white'
        },
        {
            title: 'View Bots',
            link: '/view-bots',
            color: '#94C9D5',
            textColor: 'white'
        },
        {
            title: 'Add a Company',
            link: '/add-company',
            color: '#9594D5',
            textColor: 'white'
        },
        {
            title: 'Manage Companies',
            link: '/manage-companies',
            color: '#FFF0EA',
            textColor: 'black'
        }
    ]

    const navigate = useNavigate();

    return (
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-4 w-full mt-3">
            {
                buttons.map((button, index) => (
                    <button
                        onClick={() => navigate(button.link)}
                        key={index}
                        className={`font-semibold py-2 px-4 rounded w-full flex items-center justify-center gap-2`}
                        style={{
                            backgroundColor: button.color,
                            color: button.textColor
                        }}
                    >   
                        {
                            button.title === 'Create a Bot' || button.title === 'Add a Company' ? <PlusIcon className='h-6 w-6' /> : 
                            button.title === 'View Bots' ? <EyeIcon className='h-6 w-6' /> : <CommandLineIcon className='h-6 w-6' />
                        }
                        {button.title}
                    </button>
                ))
            }
        </div>
    )
}

export default HomeButtons