/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import BotCardSkeletons from '@/components/reusable/cards/Skeletons/bot-card-skeletons'
import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import LLink from '@/components/ui/llink'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { initParams } from '@/constants/form/init-params'
import { getDashboardURLPath, getUserRole } from '@/helpers/common'
import { getCompanyId } from '@/helpers/pages/companies'
import { cn } from '@/lib/utils'
import { useGetBotsQuery } from '@/redux/features/botsApi'
import { useGetComanyListQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { Check, ChevronsUpDown, PlusSquare } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

interface Params extends IParams {
  category: string
  company_id?: string
}

export default function RecentBots() {
  // For seller only
  const { data: companyListData, isSuccess: isCompanyListSuccess } = useGetComanyListQuery({})

  const [open, setOpen] = useState<boolean>(false)

  const [params, setparams] = useState<Params>({ ...initParams({ limit: 5 }), category: 'All' })
  const initialSetupDone = useRef(false)

  useEffect(() => {
    if (!initialSetupDone.current) {
      if (['company-admin', 'editor', 'viewer'].includes(getUserRole())) {
        setparams(prev => ({ ...prev, company_id: getCompanyId() }))
      }
      initialSetupDone.current = true
    }
  }, [])

  useEffect(() => {
    if (getUserRole() === 'reseller' && isCompanyListSuccess && !params.company_id) {
      setparams(prev => ({ ...prev, company_id: companyListData?.data?.[0]?._id }))
    }
  }, [isCompanyListSuccess, companyListData, getUserRole()])

  const { data: botsData, isSuccess, isLoading } = useGetBotsQuery(params)

  return (
    <div className='mt-8'>
      <DashboardHeading
        variant='h3'
        title='Recent Bots'
        extra={
          <>
            {getUserRole() === 'reseller' && (
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className='truncate'>
                  <Button variant='outline' role='combobox' aria-expanded={open} className='max-w-72 justify-between'>
                    {params?.company_id
                      ? companyListData?.data.find(com => com._id === params.company_id)?.name
                      : 'Select Company...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='max-w-72 p-0'>
                  <Command>
                    <CommandInput placeholder='Search company...' />
                    <CommandList>
                      <CommandEmpty>No company found.</CommandEmpty>
                      <CommandGroup>
                        {companyListData?.data?.map(com => (
                          <CommandItem
                            key={com?._id}
                            value={com?._id}
                            onSelect={() => {
                              setparams({ ...params, company_id: com?._id })
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn(
                                'mr-2 h-4 w-4',
                                params?.company_id === com?._id ? 'opacity-100' : 'opacity-0'
                              )}
                            />
                            {com?.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            )}
            <LLink href={`${getDashboardURLPath()}/bots`}>
              <Button variant='outline'>View All</Button>
            </LLink>
            {getUserRole() !== 'viewer' && (
              <LLink href={`${getDashboardURLPath()}/bots/create`}>
                <Button variant='gradient' icon={<PlusSquare />}>
                  Add New
                </Button>
              </LLink>
            )}
          </>
        }
      />

      <BotCardSkeletons isLoading={isLoading} className='mt-5' limit={5} />

      {isSuccess ? (
        botsData.data.length ? (
          <CardGrid className='mt-5'>
            {botsData?.data?.map(bot => (
              <BotCard
                logo_light={bot?.logo_light}
                logo_dark={bot?.logo_dark}
                _id={bot?._id!}
                key={bot._id}
                name={bot.name!}
                category={bot.category!}
                model={bot.model!}
                createdAt={String(bot.createdAt!)}
                embedding_url={bot.embedding_url!}
              />
            ))}
          </CardGrid>
        ) : (
          <p className='italic text-lg mt-5 text-text-secondary'>No bots created yet</p>
        )
      ) : null}
    </div>
  )
}
