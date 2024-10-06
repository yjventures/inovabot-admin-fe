'use client'

import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import PriceCard from '@/components/reusable/cards/price-card'
import { Checkbox } from '@/components/reusable/form/checkbox'
import DnDUpload from '@/components/reusable/form/dnd-upload'
import Form from '@/components/reusable/form/form'
import ImagePreviewer from '@/components/reusable/form/image-previewer'
import { Input } from '@/components/reusable/form/input'
import { Textarea } from '@/components/reusable/form/textarea'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Switch } from '@/components/ui/switch'
import Typography from '@/components/ui/typography'
import { initParams } from '@/constants/form/init-params'
import usePush from '@/hooks/usePush'
import { useCreateCompanyMutation } from '@/redux/features/companiesApi'
import { useGetPackagesQuery } from '@/redux/features/packagesApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { PlusSquare } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { frequencies } from '../packages/AllPackages'

export default function CreateCompanyForm() {
  const push = usePush()
  const methods = useForm()
  const { handleSubmit, reset, watch, setValue } = methods

  const logoVal = watch('logo')
  const darkLogoVal = watch('logo_dark')

  const [needSubscription, setNeedSubscription] = useState<boolean>(true)
  const [subscriptionId, setsubscriptionId] = useState<string | null>(null)

  const [createCompany, { isLoading: isCreateLoading, isSuccess: isCreateSuccess, isError, error, data: createData }] =
    useCreateCompanyMutation()

  const onSubmit = (data: any) => {
    createCompany({ active_subscription: subscriptionId, ...data })
  }

  const discardForm = () => {
    reset()
    push('/admin/companies')
  }

  const [frequency, setFrequency] = useState(frequencies[0])
  const { data, isLoading, isSuccess } = useGetPackagesQuery(initParams({ limit: 100 }))

  useEffect(() => {
    if (isCreateSuccess) {
      toast.success('Company created successfully')
      push(`/admin/companies/invite?companyId=${createData?.company?._id}`)
    }

    if (isError) {
      toast.error(rtkErrorMessage(error))
      reset()
    }
  }, [isCreateSuccess, isError, error, reset, push, createData])

  return (
    <div className='bg-foreground rounded-xl px-4 py-6'>
      <Form methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <div className='flex justify-between items-center gap-x-4 g gap-y-2 flex-wrap mb-2'>
          <Typography variant='h4'>Compnay Information</Typography>
          <div className='flex items-center gap-x-4 gap-y-2'>
            <Button variant='destructive' onClick={discardForm}>
              Discard
            </Button>
            <Button type='submit' icon={<PlusSquare />} variant='gradient' isLoading={isCreateLoading}>
              Save Compnay
            </Button>
          </div>
        </div>
        <Input
          name='email'
          type='email'
          required
          label='Primary contact Email'
          placeholder='Enter primary contact email'
        />
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
          {logoVal ? (
            <ImagePreviewer imgSrc={logoVal} onClick={() => setValue('logo', '')} aspect='square' />
          ) : (
            <DnDUpload
              accept='image/*'
              name='logo'
              label='Company Logo Light Mode'
              required
              description='(300 x 300)'
            />
          )}

          {darkLogoVal ? (
            <ImagePreviewer imgSrc={darkLogoVal} onClick={() => setValue('logo_dark', '')} aspect='square' />
          ) : (
            <DnDUpload name='logo_dark' accept='image/*' label='Company Logo Dark Mode' description='(300 x 300)' />
          )}
        </div>
        <Input name='name' required label='Company Name' placeholder='Enter company name' />
        <Input name='web_url' type='url' required label='Company Website' placeholder='Enter company website' />
        <Input name='address' type='text' required label='Company Address' placeholder='Enter company address' />
        <Textarea name='description' required label='Short Description' placeholder='Enter company short description' />
      </Form>

      <Checkbox
        checked={needSubscription}
        onCheckedChange={e => setNeedSubscription(e as boolean)}
        label='Need Subscription?'
        id='need-subscription'
      />

      {needSubscription ? (
        <>
          <div className='flex items-center justify-center my-10'>
            <p className='text-sm sm:text-xl'>Billed Monthly</p>
            <Switch
              className='mx-2'
              onCheckedChange={e => (e ? setFrequency(frequencies[1]) : setFrequency(frequencies[0]))}
            />
            <p className='text-text text-sm sm:text-xl'>Billed Anually</p>
          </div>
          <CardGrid total={3}>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <Skeleton key={i} className='rounded-lg w-full h-96' />)
              : null}
            {isSuccess
              ? data?.data?.map(tier => (
                  <PriceCard
                    key={tier._id}
                    tier={tier}
                    frequency={frequency}
                    className='border-dashed'
                    showPopover={false}
                    child={
                      <Button
                        onClick={() => setsubscriptionId(tier._id)}
                        variant={subscriptionId === tier._id ? 'gradient' : 'outline'}
                      >
                        {subscriptionId === tier._id ? 'Selected' : 'Select Subscription'}
                      </Button>
                    }
                  />
                ))
              : null}
          </CardGrid>
        </>
      ) : null}
    </div>
  )
}
