import { Download, FileText } from 'lucide-react'
import React from 'react'
import CardWrapper from './commonn/card-wrapper'
import { cn } from '@/lib/utils'

interface Props {
  filename: string
  fileUrl: string
  variant?: 'horizontal' | 'vertical'
}

const FileCard = ({ filename, fileUrl, variant = 'horizontal' }: Props) => {
  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = fileUrl
    link.target = '_blank'
    link.download = filename
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <CardWrapper
      className={cn('flex items-center gap-x-2 gap-y-3 justify-between', {
        'flex-row': variant === 'horizontal',
        'flex-col': variant === 'vertical'
      })}
    >
      <FileText className='size-14 text-text-gray-light' strokeWidth={1} />
      <p className='flex-1 text-lg'>{filename}</p>
      <Download className='size-8 text-text-gray-dark cursor-pointer' onClick={handleDownload} strokeWidth={1} />
    </CardWrapper>
  )
}

export default FileCard
