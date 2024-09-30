'use client'

import Badge from '@/components/reusable/cards/badge'
import CardGrid from '@/components/reusable/cards/commonn/card-grid'
import TemplateCardSkeletons from '@/components/reusable/cards/Skeletons/Template-card-skeletons'
import TemplateCard from '@/components/reusable/cards/template-card'
import Intro from '@/components/reusable/common/intro'
import ConfirmationPrompt from '@/components/reusable/dashboard/confirmation-prompt'
import TableActions from '@/components/reusable/tables/table-actions'
import { TableMode } from '@/components/reusable/tables/table-selector'
import TableSorter from '@/components/reusable/tables/table-sorter'
import LLink from '@/components/ui/llink'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { useLogo } from '@/hooks/useLogo'
import { useDeleteTemplateMutation } from '@/redux/features/templatesApi'
import { IParams } from '@/types/common/IParams'
import { IResponseWithMeta, WithId } from '@/types/common/IResponse'
import { ITemplate } from '@/types/Itemplate'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { Eye, PencilLine, Trash2 } from 'lucide-react'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import toast from 'react-hot-toast'

interface Props {
  mode: TableMode
  isLoading: boolean
  isSuccess: boolean
  data?: IResponseWithMeta<WithId<ITemplate>[]>
  params: IParams
  setparams: Dispatch<SetStateAction<IParams>>
}

export default function Templates({ mode, isLoading, isSuccess, data, params, setparams }: Props) {
  const [deleteId, setdeleteId] = useState<string | undefined>(undefined)
  const [open, setopen] = useState<boolean>(false)
  const [
    deleteTemplate,
    { isLoading: isDeleteLoading, isSuccess: isDeleteSuccess, isError: isDeleteError, error: deleteError }
  ] = useDeleteTemplateMutation()

  useEffect(() => {
    if (isDeleteSuccess) toast.success('Template deleted successfully')
    if (isDeleteError) toast.error(rtkErrorMessage(deleteError))
  }, [isDeleteSuccess, isDeleteError, deleteError])

  return (
    <>
      <TemplateCardSkeletons isLoading={isLoading} />

      {isSuccess && data?.data?.length ? (
        mode == 'grid' ? (
          <CardGrid total={3}>
            {data?.data?.map((template: WithId<ITemplate>) => (
              <TemplateCard key={template._id} template={template} />
            ))}
          </CardGrid>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <TableSorter params={params} setparams={setparams} sortField='name'>
                    Template Name
                  </TableSorter>
                </TableHead>
                <TableHead>Description</TableHead>

                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.data.map((template: WithId<ITemplate>) => {
                // eslint-disable-next-line react-hooks/rules-of-hooks
                const logoSrc = useLogo(template?.logo_light!, template?.logo_dark!)
                return (
                  <TableRow key={template?._id}>
                    <TableCell>
                      <Intro
                        imgSrc={logoSrc}
                        title={template?.name}
                        description={<Badge>{template?.category}</Badge>}
                      />
                    </TableCell>
                    <TableCell>
                      {template?.description?.slice(0, 70)}{' '}
                      {template?.description && template?.description?.length > 70 ? '...' : ''}
                    </TableCell>

                    <TableCell>
                      <TableActions>
                        <LLink href={`/admin/templates/${template._id}`}>
                          <Eye className='text-text-primary' />
                        </LLink>
                        <LLink href={`/admin/templates/update/${template._id}`}>
                          <PencilLine className='text-blue-primary' />
                        </LLink>
                        <Trash2
                          className='text-error'
                          onClick={() => {
                            setdeleteId(template._id)
                            setopen(true)
                          }}
                        />
                      </TableActions>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        )
      ) : null}

      {isSuccess && !data?.data?.length && <p className='mt-10 italic text-text-gray'>No templates yet</p>}

      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        isLoading={isDeleteLoading}
        title='Are you sure to delete this template?'
        cb={() => deleteTemplate(deleteId!)}
      />
    </>
  )
}
