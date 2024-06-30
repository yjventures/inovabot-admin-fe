import HomeAnalytics from '@/components/Home/HomeAnalytics/HomeAnalytics'
import LearnSection from '@/components/Home/LearnSection/LearnSection'
import { useState } from 'react'

const Home = () => {
  const [newCompanyModal, setNewCompanyModal] = useState<boolean>(false)

  return (
    <div className="flex justify-start items-start flex-col min-h-[99vh] relative">
      <HomeAnalytics />
      <LearnSection />
    </div>
  )
}

export default Home