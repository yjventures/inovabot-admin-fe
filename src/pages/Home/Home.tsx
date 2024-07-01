import HomeAnalytics from '@/components/Home/HomeAnalytics/HomeAnalytics'
import HomeButtons from '@/components/Home/HomeButtons/HomeButtons'
import LearnSection from '@/components/Home/LearnSection/LearnSection'
import RecentCompanies from '@/components/Home/RecentCompanies/RecentCompanies'
import Statistics from '@/components/Home/Statistics/Statistics'
import Template from '@/components/Home/Template/Template'

const Home = () => {

  return (
    <div className="flex justify-start items-start flex-col min-h-[99vh] relative font-publicSans">
      <HomeAnalytics />
      <LearnSection />
      <HomeButtons />
      <Template />
      <RecentCompanies />
      <Statistics />
    </div>
  )
}

export default Home