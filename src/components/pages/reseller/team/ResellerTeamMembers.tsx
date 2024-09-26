/* eslint-disable no-unsafe-optional-chaining */
'use client'

import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import LLink from '@/components/ui/llink'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { cn } from '@/lib/utils'
import { useGetComanyListQuery, useGetCompanyQuery } from '@/redux/features/companiesApi'
import { Check, ChevronsUpDown, Send } from 'lucide-react'
import { useEffect, useState } from 'react'
import AllTeamMembersForReseller from './AllTeamMembersForReseller'

export default function ResellerTeamMembers() {
  const [open, setOpen] = useState(false)
  const [company_id, setcompany_id] = useState('')

  const {
    data: companyListData,
    isSuccess: isCompanyListSuccess,
    isLoading: isCompanyListLoading
  } = useGetComanyListQuery({})

  useEffect(() => {
    setcompany_id('All')
  }, [])

  const [skip, setskip] = useState<boolean>(true)
  const { data: companyData } = useGetCompanyQuery(company_id, { skip })

  const { logo, name, web_url, address, description, createdAt, expires_at } = {
    ...companyData?.data
  }

  useEffect(() => {
    if (company_id) {
      setskip(false)
    }
  }, [company_id])

  return (
    <div>
      {isCompanyListLoading ? <Skeleton className='w-full rounded-lg h-72' /> : null}
      {isCompanyListSuccess ? (
        <CompanyIntoCard
          name={company_id === 'All' ? 'All Companies' : name!}
          logo={company_id !== 'All' && logo}
          payment_status={!!expires_at!}
          createdAt={company_id !== 'All' && createdAt!}
          expires_at={company_id !== 'All' && expires_at!}
          description={company_id !== 'All' && description!}
          address={company_id !== 'All' && address}
          web_url={company_id !== 'All' && web_url}
          topCTASection={
            <>
              {company_id !== 'All' && (
                <LLink href={`/reseller/team/invite?companyId=${company_id}`}>
                  <Button icon={<Send />}>Invite a team member</Button>
                </LLink>
              )}

              <LLink href={`/reseller/companies/${company_id}`}>
                <Button variant='black'>View Details</Button>
              </LLink>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className='truncate'>
                  <Button variant='outline' role='combobox' aria-expanded={open} className='max-w-72 justify-between'>
                    {company_id === 'All'
                      ? 'All Companies'
                      : company_id
                      ? companyListData?.data.find(com => com._id === company_id)?.name
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
                        {[{ _id: 'All', name: 'All' }, ...companyListData?.data]?.map(com => (
                          <CommandItem
                            key={com?._id}
                            value={com?._id}
                            onSelect={() => {
                              setcompany_id(com?._id)
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
            </>
          }
        />
      ) : null}

      <AllTeamMembersForReseller company_id={company_id} />
    </div>
  )
}
