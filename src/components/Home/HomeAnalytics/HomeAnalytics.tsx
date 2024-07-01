import bots from '@/assets/images/home/bots.png';
import activeBots from '@/assets/images/home/active-bots.png';
import compnies from '@/assets/images/home/companies.png';
import docs from '@/assets/images/home/docs.png';

const HomeAnalytics = () => {

  const FilterComponent = () => {
    return (
      <div className="flex justify-between py-2 flex-wrap gap-2 mt-3 z-0">
        <div className='border-2 dark:border-gray-400 rounded-md'>
          {[
            'All Date',
            '12 Months',
            '30 Days',
            '7 Days',
            '24 Hour'
          ].map((filter, index) => (
            <button
              key={index}
              className={`px-4 bg-gray-100 dark:bg-dark-panel text-gray-500 py-1 rounded-md hover:bg-gray-200 ${index === 0 && 'bg-gray-200'}`}
              onClick={() => { }}
            >
              {filter}
            </button>
          ))}
        </div>

      </div>
    )
  }

  return (
    <div className="font-publicSans w-full">
      {/* upper side */}
      <div className=" flex justify-between items-start flex-col md:flex-row w-full mt-4">
        <div>
          <p className=" text-light-headingText dark:text-dark-headingText text-2xl">Welcome back Mahi</p>
          <p className="py-2 text-gray-500">Good to see you there, Manager</p>
        </div>
        <FilterComponent />
      </div>
      <div className='grid sm:grid-cols-2 md:grid-cols-4 gap-6 mt-4'>
        <div className='border-2 border-[#eeeff2] rounded-md relative p-4'>
          <p className='text-gray-500 font-[12px] '>
            Total Bots
          </p>
          <p className='font-[600] my-2 text-[22px] text-dark dark:text-white'>
            45
          </p>
          <p className='text-gray-500'> +4 Today</p>
          <img src={bots} alt="icon" className={`absolute top-2 right-3`} />
        </div>
        <div className='border-2 border-[#eeeff2] rounded-[5px] relative p-4'>
          <p className='text-gray-500 font-[12px]'>
            Active Bots
          </p>
          <p className='font-[600] my-2 text-[22px] text-dark dark:text-white'>
            75
          </p>
          <p className='text-gray-500'> +8 Today</p>

          <img src={activeBots} alt="icon" className={`absolute top-2 right-3`} />
        </div>
        <div className='border-2 border-[#eeeff2] rounded-[5px] relative p-4'>
          <p className='text-gray-500 font-[12px]'>
            Companies
          </p>
          <p className='font-[600] my-2 text-[22px] text-dark dark:text-white'>
            12
          </p>
          <p className='text-gray-500'> +1 Today</p>

          <img src={compnies} alt="icon" className={`absolute top-2 right-3`} />
        </div>
        <div className='border-2 border-[#eeeff2] rounded-[5px] relative p-4'>
          <p className='text-gray-500 font-[12px]'>
            Documents Uploaded
          </p>
          <p className='font-[600] my-2 text-[22px] text-dark dark:text-white'>
            78
          </p>
          <p className='text-gray-500'> +8 Today</p>

          <img src={docs} alt="icon" className={`absolute top-2 right-3`} />
        </div>

      </div>
    </div>
  )
}

export default HomeAnalytics