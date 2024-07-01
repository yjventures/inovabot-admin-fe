import HomeAnalytics from '@/components/Home/HomeAnalytics/HomeAnalytics'
import HomeButtons from '@/components/Home/HomeButtons/HomeButtons'
import LearnSection from '@/components/Home/LearnSection/LearnSection'
import RecentCompanies from '@/components/Home/RecentCompanies/RecentCompanies'
import Template from '@/components/Home/Template/Template'
import { useState } from 'react'

const Home = () => {
  const [newCompanyModal, setNewCompanyModal] = useState<boolean>(false)

  return (
    <div className="flex justify-start items-start flex-col min-h-[99vh] relative font-publicSans">
      <HomeAnalytics />
      <LearnSection />
      <HomeButtons />
      <Template />
      <RecentCompanies />
    </div>
  )
}

export default Home