import womanWorking from '@/assets/images/home/woman-working.png'
import backgroundChat from '@/assets/images/home/background-chat.png'
import { useState } from 'react'
import NewCompanyModal from '@/components/Company/NewCompanyModal'

const Home = () => {
  const [newCompanyModal, setNewCompanyModal] = useState<boolean>(false)
  return (
    <div className=" text-light-normalText dark:text-dark-normalText flex justify-center items-center flex-col min-h-[99vh] relative">
      <img
        src={womanWorking}
        alt="banner-image"
        className='object-cover max-w-[330px] min-h-[456px]'
      />

      {/* <div className=' w-[1000px] h-[1000px] absolute -bottom-200 rounded-full '
        style={{
          "boxShadow": "0px 1px 3px 0px #19213D1A",
          "background": "radial-gradient(55.64% 55.64% at 58.15% 32.88%, #0679FF 0%, #2A8CFF 100%)"
        }}
      >
      </div> */}
      <div className=' bg-white'>
        <img
          src={backgroundChat}
          alt="background-chat"
          className='object-cover max-h-[456px]'
        />
      </div>

      <button
        onClick={()=> {
          setNewCompanyModal(true)
        }}
      >
        New company
      </button> 
      {
        newCompanyModal && <NewCompanyModal />
      }
    </div>
  )
}

export default Home