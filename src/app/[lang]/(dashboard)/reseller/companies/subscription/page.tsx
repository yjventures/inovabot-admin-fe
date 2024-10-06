import PricingPlans from '@/components/pages/reseller/subscription/PricingPlans'
import Typography from '@/components/ui/typography'

export const metadata = {
  title: 'Subscribe'
}

export default function ResellerCompanySubscriptionPage() {
  return (
    <div>
      <main>
        <Typography
          variant='h2'
          className='text-balance text-center pb-5 leading-loose text-2xl md:text-3xl lg:text-5xl max-w-full'
        >
          Subscribe to Inova
        </Typography>
        <p className='text-text-tartiary text-center max-w-full font-medium text-lg'>
          Subscribe to Inova&apos;s AI Chatbot for Customer Support
        </p>
        {/* <div className='flex items-center justify-center mt-5'>
        <LLink href='/pricing'>
          <Button size='lg'>{t.comparePlans}</Button>
        </LLink>
      </div> */}

        <PricingPlans />
      </main>
    </div>
  )
}
