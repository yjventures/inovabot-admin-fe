import BotAllImages from '@/components/pages/admin/bots/BotImages/BotAllImages'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'

export const metadata = {
  title: 'Bot Images'
}

export default function BotAllImagesPage() {
  return (
    <>
      <DashboardHeading title='Bot Images' />
      <BotAllImages />
    </>
  )
}
