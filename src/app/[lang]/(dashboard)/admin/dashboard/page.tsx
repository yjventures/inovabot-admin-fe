import CardGrid from '@/components/reusable/cards/card-grid'
import CompanyCard from '@/components/reusable/cards/company-card'
import React from 'react'

export default function DashboardPage() {
  return (
    <div>
      <CardGrid>
        {Array.from({ length: 10 }, (_, index) => (
          <CompanyCard
            key={index}
            bots={16}
            name='Company Name'
            web_url='https://www.company.com'
            recurring='yearly'
            last_subscribed='2024-06-12T00:00:00.000Z'
            createdAt='2024-06-12T00:00:00.000Z'
          />
        ))}
      </CardGrid>
    </div>
  )
}
