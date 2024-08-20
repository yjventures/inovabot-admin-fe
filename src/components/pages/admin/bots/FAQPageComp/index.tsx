'use client'

import DashboardHeading from '@/components/reusable/dashboard/dashboard-heading'
import Search from '@/components/reusable/tables/search'
import TablePagination, { PaginationProps } from '@/components/reusable/tables/table-pagination'
import { Button } from '@/components/ui/button'
import { initParams } from '@/constants/form/init-params'
import { IParams } from '@/types/common/IParams'
import { Eye, FileQuestion, PencilLine, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useState } from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { dummyFAQ } from '../UpdateBotForm/FAQ'
import TableActions from '@/components/reusable/tables/table-actions'
import FAQDetailsModal from './FAQDetailsModal'
import FAQUpdateModal from './FAQUpdateModal'

export default function FAQPageComp() {
  const [params, setparams] = useState<IParams>(initParams({}))
  const [searchValue, setsearchValue] = useState<string>('')
  return (
    <div>
      <DashboardHeading
        title='FAQ'
        extra={
          <Button variant='black' icon={<FileQuestion />}>
            Add FAQ
          </Button>
        }
      />

      <Search
        searchValue={searchValue}
        setsearchValue={setsearchValue}
        placeholder='Search Files'
        inputClassName='rounded-lg'
        className='max-w-lg mb-6'
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>FAQ</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyFAQ
            .concat(dummyFAQ)
            .concat(dummyFAQ)
            .map((faq, index) => (
              <TableRow key={index}>
                <TableCell className='font-medium text-sm'>{faq.question}</TableCell>
                <TableCell>
                  <TableActions>
                    <FAQDetailsModal faq={faq} />
                    <FAQUpdateModal faq={faq} />
                    <Trash2 className='text-destructive' />
                  </TableActions>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>

      <TablePagination
        params={params}
        setparams={setparams as Dispatch<SetStateAction<PaginationProps>>}
        metadata={{ totalDocuments: 100, currentPage: 1, totalPage: 10 }}
      />
    </div>
  )
}
