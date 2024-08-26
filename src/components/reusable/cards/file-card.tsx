'use client'

import { Download, FileText, Trash2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import CardWrapper from './commonn/card-wrapper'
import { cn } from '@/lib/utils'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import { locallyDownloadFile } from '@/utils/files/locallyDownloadFile'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import { formatFileSize } from '@/utils/files/formatFileSize'
import { useDeleteBotFileMutation } from '@/redux/features/knowledgeBaseApi'
import toast from 'react-hot-toast'
import { rtkErrorMessage } from '@/utils/error/errorMessage'

export interface IFile {
  _id: string
  name: string
  url: string
  size: number
  bot_id: string
}

interface Props {
  file: IFile
  variant?: 'horizontal' | 'vertical'
}

const FileCard = ({ file, variant = 'horizontal' }: Props) => {
  const { _id, name, url, size, bot_id } = { ...file }

  const [open, setopen] = useState<boolean>(false)

  const [deleteFile, { isLoading, isSuccess, isError, error }] = useDeleteBotFileMutation()
  const deleteFileFn = () => {
    // TODO: delete file when api is done
    deleteFile({ bot_id, file_id: _id })
  }

  useEffect(() => {
    if (isSuccess) toast.success('File deleted successfully!')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  return (
    <>
      <CardWrapper
        className={cn('flex items-center gap-x-2 gap-y-3 justify-between', {
          'flex-row': variant === 'horizontal',
          'flex-col': variant === 'vertical'
        })}
      >
        <CardPopover>
          {variant === 'vertical' ? (
            <CardPopoverContent
              text='Download'
              icon={<Download className='text-blue-primary' />}
              onClick={() => locallyDownloadFile(url, name)}
            />
          ) : null}
          <CardPopoverContent
            icon={<Trash2 className='text-destructive' />}
            text='Delete'
            onClick={() => setopen(true)}
          />
        </CardPopover>
        <FileText className='size-14 text-text-gray-light' strokeWidth={1} />
        <div className={cn('flex-1', { 'text-center': variant === 'vertical' })}>
          <p className='text-lg'>{name}</p>
          <p className='text-sm font-medium text-text-gray'>{formatFileSize(size)}</p>
        </div>
        {/* {variant === 'horizontal' ? (
          <Download
            className='size-8 text-text-gray-dark cursor-pointer'
            onClick={() => locallyDownloadFile(url, name)}
            strokeWidth={1}
          />
        ) : null} */}
      </CardWrapper>
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        cb={deleteFileFn}
        title='Are you sure you want to delete this file?'
        isLoading={isLoading}
      />
    </>
  )
}

export default FileCard
