/* eslint-disable no-unsafe-optional-chaining */
'use client'

import Badge from '@/components/reusable/cards/badge'
import BotCard from '@/components/reusable/cards/bot-card'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import CompanyIntoCard from '@/components/reusable/cards/company-intro-card'
import BotCardSkeletons from '@/components/reusable/cards/Skeletons/bot-card-skeletons'
import Intro from '@/components/reusable/common/intro'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import Search from '@/components/reusable/tables/search'
import TableActions from '@/components/reusable/tables/table-actions'
import TableSelector, { TableMode } from '@/components/reusable/tables/table-selector'
import { Button } from '@/components/ui/button'
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command'
import LLink from '@/components/ui/llink'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { BOT_URL } from '@/configs'
import { initParams } from '@/constants/form/init-params'
import { getDashboardURLPath } from '@/helpers/common'
import { useLogo } from '@/hooks/useLogo'
import { cn } from '@/lib/utils'
import { useDeleteBotMutation, useGetBotsQuery } from '@/redux/features/botsApi'
import { useGetCategoriesQuery } from '@/redux/features/categoriesApi'
import { useGetComanyListQuery, useGetCompanyQuery } from '@/redux/features/companiesApi'
import { IParams } from '@/types/common/IParams'
import { formateDate } from '@/utils/date/formateDate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Check, ChevronsUpDown, Eye, MessagesSquare, PencilLine, PlusSquare, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Params = IParams & { company_id: string; category: string }

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

  const { logo, name, web_url, address, description, createdAt, expires_at } = {
    ...companyData?.data
  }

  useEffect(() => {
    if (company_id) {
      setskip(false)
    }
  }, [company_id])

  const params: Params = { ...initParams({}), company_id, search, category }

  const { data: botsData, isSuccess, isLoading } = useGetBotsQuery(params)

  const [openPrompt, setOpenPrompt] = useState(false)
  const [deleteId, setDeleteId] = useState<string | undefined>(undefined)
  const [deleteBot, { isSuccess: isDeleteSuccess, isError, error }] = useDeleteBotMutation()

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Bot deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isDeleteSuccess, isError, error])

  return (
    <div className='mt-10'>
      {isCompanyListLoading ? <Skeleton className='w-full rounded-lg h-72' /> : null}
      {isCompanyListSuccess ? (
        <CompanyIntoCard
          name={name!}
          logo={logo}
          payment_status={!!expires_at!}
          createdAt={createdAt!}
          expires_at={expires_at!}
          description={description!}
          address={address}
          web_url={web_url}
          topCTASection={
            <>
              <LLink href={`/reseller/bots/create?companyId=${company_id}`}>
                <Button icon={<PlusSquare />}>Create a Bot</Button>
              </LLink>
              <LLink href={`/reseller/companies/${company_id}`}>
                <Button variant='black'>View Details</Button>
              </LLink>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild className='truncate'>
                  <Button variant='outline' role='combobox' aria-expanded={open} className='max-w-72 justify-between'>
                    {company_id ? companyListData?.data.find(com => com._id === company_id)?.name : 'Select Company...'}
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
          mode === 'grid' ? (
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
            <div className='mt-8'>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Bot</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {botsData?.data?.map(bot => {
                    // eslint-disable-next-line react-hooks/rules-of-hooks
                    const imgSrc = useLogo(bot?.logo_light!, bot?.logo_dark!)
                    const url = `${BOT_URL}/${bot?.embedding_url}`
                    return (
                      <TableRow key={bot?._id}>
                        <TableCell>
                          <Intro title={bot?.name!} description={<Badge>{bot?.category}</Badge>} imgSrc={imgSrc} />
                        </TableCell>
                        <TableCell>{formateDate(bot?.createdAt! as unknown as string, true)}</TableCell>
                        <TableCell className='text-right'>
                          <TableActions>
                            <a href={url} target='_blank'>
                              <Eye />
                            </a>
                            <LLink href={`${getDashboardURLPath()}/bots/${bot?._id}/threads`}>
                              <MessagesSquare className='text-cyan-dark' />
                            </LLink>
                            <LLink href={`/reseller/bots/update/${bot?._id}`}>
                              <PencilLine className='text-blue-primary' />
                            </LLink>
                            <Trash2
                              className='text-destructive cursor-pointer'
                              onClick={() => {
                                setDeleteId(bot?._id)
                                setOpenPrompt(true)
                              }}
                            />
                          </TableActions>
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </div>
          )
        ) : (
          <p className='italic text-text-secondary mt-5 min-h-72'>No bots created yet</p>
        )
      ) : null}
      <ConfirmationPrompt
        open={openPrompt}
        onOpenChange={setOpenPrompt}
        cb={() => deleteBot(deleteId!)}
        title='Are you sure to delete this bot?'
      />
    </div>
  )
}
