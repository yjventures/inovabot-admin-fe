'use client'

import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import Search from '@/components/reusable/tables/search'
import TableSelector, { TableMode } from '@/components/reusable/tables/table-selector'
import { Button } from '@/components/ui/button'
import { initParams } from '@/constants/form/init-params'
import { cn } from '@/lib/utils'
import { useGetBotsQuery } from '@/redux/features/botsApi'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { useGetComanyListQuery, useGetCompanyQuery } from '@/redux/features/companiesApi'
import { useEffect, useState } from 'react'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Check, ChevronsUpDown } from 'lucide-react'
import { IParams } from '@/types/common/IParams'
import LLink from '@/components/ui/llink'
import { Skeleton } from '@/components/ui/skeleton'
import BotCardSkeletons from '@/components/reusable/cards/Skeletons/bot-card-skeletons'

type Params = IParams & { company_id: string }

export default function AllBots() {
  const [open, setOpen] = useState(false)
  const [company_id, setcompany_id] = useState('')

  const [search, setsearch] = useState<string>('')
  const [mode, setmode] = useState<TableMode>('grid')

  const [category, setcategory] = useState<string>('All')
  const { data: categoriesData, isSuccess: isCategorySuccess, isLoading: iscategoryLoading } = useGetCategoriesQuery({})
  const {
    data: companyListData,
    isSuccess: isCompanyListSuccess,
    isLoading: isCompanyListLoading
  } = useGetComanyListQuery({})

  useEffect(() => {
    if (isCompanyListSuccess) setcompany_id(companyListData?.data?.[0]?._id)
  }, [isCompanyListSuccess, companyListData])

  const [skip, setskip] = useState<boolean>(true)
  const { data: companyData } = useGetCompanyQuery(company_id, { skip })

  const { logo, name, web_url, address, description, createdAt, expires_at, payment_status } = {
    ...companyData?.data
  }

  useEffect(() => {
    if (company_id) {
      setskip(false)
    }
  }, [company_id])

  type Params = IParams & { company_id: string; category: string }
  const params: Params = { ...initParams({}), company_id, search, category }

  const { data: botsData, isSuccess, isLoading } = useGetBotsQuery(params)

  return (
    <div className='mt-10'>
      {isCompanyListLoading ? <Skeleton className='w-full rounded-lg h-72' /> : null}
      {isCompanyListSuccess ? (
        <CompanyIntoCard
          name={name!}
          logo={logo}
          payment_status={payment_status!}
          createdAt={createdAt!}
          expires_at={expires_at!}
          description={description!}
          address={address}
          web_url={web_url}
          topCTASection={
            <div className='flex flex-wrap gap-x-3 gap-2'>
              <LLink href={`/admin/companies/${company_id}`}>
                <Button variant='black'>View Details</Button>
              </LLink>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant='outline' role='combobox' aria-expanded={open} className='w-[200px] justify-between'>
                    {company_id ? companyListData?.data.find(com => com._id === company_id)?.name : 'Select Company...'}
                    <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className='w-[200px] p-0'>
                  <Command>
                    <CommandInput placeholder='Search company...' />
                    <CommandList>
                      <CommandEmpty>No company found.</CommandEmpty>
                      <CommandGroup>
                        {companyListData?.data?.map(com => (
                          <CommandItem
                            key={com?._id}
                            value={com?._id}
                            onSelect={currentValue => {
                              setcompany_id(currentValue === company_id ? '' : currentValue)
                              setOpen(false)
                            }}
                          >
                            <Check
                              className={cn('mr-2 h-4 w-4', company_id === com?._id ? 'opacity-100' : 'opacity-0')}
                            />
                            {com?.name}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </CommandList>
                  </Command>
                </PopoverContent>
              </Popover>
            </div>
          }
        />
      ) : null}
      <div className='flex gap-x-4 items-center justify-between mt-6'>
        {iscategoryLoading ? (
          <div className='flex flex-wrap gap-x-3 gap-y-1.5'>
            {Array.from({ length: 3 }, (_, i) => (
              <Skeleton key={i} className='w-40 h-10 rounded-full' />
            ))}
          </div>
        ) : null}
        {isCategorySuccess ? (
          <div className='flex flex-wrap gap-x-3 gap-y-1.5'>
            {[{ _id: '1', title: 'All' }, ...categoriesData?.categories]?.map(cat => (
              <Button
                key={cat._id}
                variant='outline'
                onClick={() => setcategory(cat.title)}
                className={cn('rounded-full', { 'bg-gray-secondary': category === cat.title })}
              >
                {cat.title}
              </Button>
            ))}
          </div>
        ) : null}
        <div className='flex gap-x-4'>
          <Search searchValue={search} setsearchValue={setsearch} placeholder='Search' />
          <TableSelector mode={mode} setmode={setmode} />
        </div>
      </div>

      <BotCardSkeletons isLoading={isLoading} className='mt-5' />

      {isSuccess ? (
        botsData?.data?.length ? (
          <CardGrid className='mt-5'>
            {botsData?.data?.map(bot => (
              <BotCard
                _id={bot?._id!}
                key={bot._id}
                name={bot.name!}
                category={bot.category!}
                model={bot.model!}
                createdAt={String(bot.createdAt!)}
              />
            ))}
          </CardGrid>
        ) : (
          <p className='italic text-text-secondary mt-5 min-h-72'>No bots created yet</p>
        )
      ) : null}
    </div>
  )
}
