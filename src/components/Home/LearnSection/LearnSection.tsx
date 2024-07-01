import background from '@/assets/images/home/learn-background.png';

const LearnSection = () => {
    return (
        <div
            className='w-full h-[330px] rounded-md mt-4 grid grid-cols-1 md:grid-cols-2 gap-4'
            style={{
                backgroundImage: `url(${background})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <p className='p-2 max-w-full'>
                <iframe className='rounded-md w-full' height="315" src="https://www.youtube.com/embed/ivrumxRUz_Y?si=RsAKrilQTdXpeC8e" title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;" referrerPolicy="strict-origin-when-cross-origin" ></iframe>
            </p>
            <div className=' flex justify-center items-center flex-col gap-2'>
                <p className='text-2xl text-white'>Welcome to Inova admin!</p>
                <p className='text-md text-white'>Start your halal journey with marriage :D</p>
                <button className='p-2 bg-[#D55D37] text-white rounded-md px-4 mt-2'>
                    Learn More
                </button>
            </div>
        </div>
    )
}

export default LearnSection