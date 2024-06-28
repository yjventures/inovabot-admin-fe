import loginImage from '@/assets/images/auth/background.png'
import tableImage from '@/assets/images/auth/tablet.png'
import statisticCard from '@/assets/images/auth/statitstic-card.png'

const ImagePart = () => {
    return (
        <div className='hidden sm:flex justify-center items-center max-h-[90vh] w-full object-fill rounded-md'
            style={{
                backgroundImage: `url(${loginImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div className='relative '>
                <img src={tableImage} alt="tablet" />
                <img src={statisticCard} alt="statistic-card" className='absolute -bottom-[130px] lg:-right-[70px]' />
            </div>

        </div>
    )
}

export default ImagePart