'use client'

import { Download, FileText, Trash2 } from 'lucide-react'
import React, { useState } from 'react'
import CardWrapper from './commonn/card-wrapper'
import { cn } from '@/lib/utils'
import CardPopover, { CardPopoverContent } from './commonn/card-popover'
import { locallyDownloadFile } from '@/utils/files/locallyDownloadFile'
import ConfirmationPrompt from '../dashboard/confirmation-prompt'

export interface IFile {
  _id: string
  name: string
  url: string
  size: string
}

interface Props {
  file: IFile
  variant?: 'horizontal' | 'vertical'
}

const FileCard = ({ file, variant = 'horizontal' }: Props) => {
  const { _id, name, url, size } = { ...file }

  const [open, setopen] = useState<boolean>(false)
  const deleteFileFn = () => {
    // TODO: delete file when api is done
    console.log(_id)
  }

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
          <p className='text-sm font-medium text-text-gray'>{size}</p>
        </div>
        {variant === 'horizontal' ? (
          <Download
            className='size-8 text-text-gray-dark cursor-pointer'
            onClick={() => locallyDownloadFile(url, name)}
            strokeWidth={1}
          />
        ) : null}
      </CardWrapper>
      <ConfirmationPrompt
        open={open}
        onOpenChange={setopen}
        cb={deleteFileFn}
        title='Are you sure you want to delete this file?'
      />
    </>
  )
}

export default FileCard
