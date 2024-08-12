import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import StatisticsCard from '@/components/reusable/cards/statistics-card'
import TemplateCard from '@/components/reusable/cards/template-card'
import { FileClock } from 'lucide-react'
import React from 'react'
import FormExample from './Form'
import Tutorial from '@/components/reusable/dashboard/tutorial'
import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import { Button } from '@/components/ui/button'

export default function DashboardPage() {
  return (
    <div>
      <FormExample />

      <CardGrid className='mt-20'>
        {Array.from({ length: 10 }, (_, index) => (
          <BotCard
            key={index}
            name='Company Name'
            assistant_id='234oh23o423o4323o24j23'
            model='gpt-4o'
            createdAt='2024-06-12T00:00:00.000Z'
          />
        ))}
      </CardGrid>

      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
        {Array.from({ length: 10 }, (_, index) => (
          <TemplateCard key={index} name='Template Name' tag='tag' description='Template Description' />
        ))}
      </div>

      <div className='mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
        {Array.from({ length: 10 }, (_, index) => (
          <StatisticsCard key={index} icon={FileClock} title='Title' number='100' />
        ))}
      </div>

      <Tutorial
        videoId='oPVgo3jOUAc'
        title='Tutorial Title'
        description='Tutorial Description'
        ctaLabel='Tutorial CTA'
        ctaHref='/'
        className='my-20'
      />
      <CompanyIntoCard
        name='Company Name'
        payment_status='paid'
        createdAt='2024-06-12T00:00:00.000Z'
        expires_at='2024-06-12T00:00:00.000Z'
        description='Lorem ipsum dolor sit amet consectetur, adipisicing elit. Libero, exercitationem nostrum. Voluptate architecto vel perspiciatis cum, natus eum, dicta accusantium voluptas saepe mollitia delectus soluta hic impedit repellat veritatis at et! Iusto modi soluta reprehenderit inventore fugiat assumenda officia veritatis?'
        address='Dhaka, Bangladesh'
        web_url='https://www.company.com'
        topCTASection={
          <div className='flex flex-wrap gap-x-3 gap-2'>
            <Button>Button</Button>
            <Button variant='black'>Action</Button>
            <Button variant='destructive'>Delete</Button>
          </div>
        }
      />
    </div>
  )
}
