'use client'

import { cn } from '@/lib/utils'
import { useDeleteBotFileMutation } from '@/redux/features/knowledgeBaseApi'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { formatFileSize } from '@/utils/files/formatFileSize'
import { locallyDownloadFile } from '@/utils/files/locallyDownloadFile'
import { Download, FileText, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import CardWrapper from './commonn/card-wrapper'

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
        className={cn('flex items-center gap-x-2 gap-y-3 justify-between h-full p-2', {
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
        <FileText className='size-14 min-w-14 text-text-gray-light' strokeWidth={1} />
        <div className={cn('flex-1 space-y-1', { 'text-center': variant === 'vertical' })}>
          <p className='text-sm font-medium break-all overflow-hidden hyphens-manual'>{name}</p>
          <p className='text-xs font-medium text-text-gray'>{formatFileSize(size)}</p>
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
