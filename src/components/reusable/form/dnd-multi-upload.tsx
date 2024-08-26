'use client'

import animationData from '@/assets/lottie/imageUploading.json'
import { Button } from '@/components/ui/button'
import Overlay from '@/components/ui/overlay'
import { cn } from '@/lib/utils'
import { ImageIcon, LucideProps } from 'lucide-react'
import {
  ChangeEventHandler,
  DragEventHandler,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes,
  useEffect,
  useRef
} from 'react'
import toast from 'react-hot-toast'
import FormLabel from './form-label'
import axios from 'axios'
import { API_URL } from '@/configs'
import { rtkErrorMessage } from '@/utils/error/errorMessage'
import { getToken } from '@/utils/auth/getToken'
import { useUploadKnowledgeBaseMutation } from '@/redux/features/knowledgeBaseApi'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  text?: string
  buttonLabel?: string
  className?: string
  labelClassName?: string
  containerClassName?: string
  label?: string
  required?: boolean
  id?: string
  bot_id: string
  companyId: string
  cb?: () => void
}

const DnDMultiUpload = ({
  name,
  icon: Icon,
  text,
  buttonLabel,
  label,
  required = false,
  className,
  labelClassName,
  containerClassName,
  bot_id,
  companyId,
  id,
  cb = () => {},
  ...rest
}: Props) => {
  const inputBtnRef = useRef<HTMLInputElement | null>(null)

  const handleDrop: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    const files = Array.from(e.dataTransfer.files)
    if (files.length) {
      handleFiles(files)
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const files = e.target.files ? Array.from(e.target.files) : []
    if (files.length) {
      handleFiles(files)
    }
  }
  const handleButtonClick = () => {
    if (inputBtnRef.current) {
      inputBtnRef.current?.click()
    }
  }

  const handleFiles = (files: File[]) => {
    uploadFiles(files)
  }

  const [upload, { isSuccess, isError, error, isLoading }] = useUploadKnowledgeBaseMutation()

  useEffect(() => {
    if (isSuccess) toast.success('Files uploaded successfully')
    if (isError) toast.error(rtkErrorMessage(error))
  }, [isSuccess, isError, error])

  const uploadFiles = async (files: File[]) => {
    cb()
    try {
      await Promise.all(
        files.map((file: File) => {
          const formData = new FormData()
          formData.append('file', file)
          formData.append('bot_id', bot_id)
          formData.append('company_id', companyId)
          return upload(formData)
        })
      )

      if (inputBtnRef.current) inputBtnRef.current.value = ''
    } catch (error) {
      if (inputBtnRef.current) inputBtnRef.current.value = ''
      console.error('Error uploading files', error)
    }
  }

  return (
    <>
      <div className={cn(containerClassName)}>
        <FormLabel label={label} labelClassName={labelClassName} name={id || name} required={required} />

        <div
          id={id || name}
          className={cn(
            'border-2 rounded-2xl border-dashed p-5 sm:p-10 text-center flex flex-col items-center justify-center bg-background focus:border-4',
            className
          )}
          onDrop={handleDrop}
          onDragOver={e => e.preventDefault()}
        >
          <div className='pb-4'>
            <div className='flex flex-col items-center justify-center gap-4'>
              <div className='p-3.5 bg-black rounded-lg'>
                {Icon ? (
                  <Icon className='text-foreground' size={20} strokeWidth={2} />
                ) : (
                  <ImageIcon className='text-foreground' size={20} strokeWidth={2} />
                )}
              </div>
              <p className='text-text-gray-light'>
                {text || 'Drag and drop files here, or click the button below to select files'}
              </p>
            </div>
          </div>
          <input
            type='file'
            ref={inputBtnRef}
            multiple
            onChange={handleChange}
            className='hidden'
            id='file-uploads'
            {...rest}
          />
          <Button
            onClick={handleButtonClick}
            variant='secondary'
            className='h-10 bg-magenta-light font-bold hover:bg-magenta-primary hover:text-foreground'
          >
            {buttonLabel || 'Select Files'}
          </Button>
        </div>
      </div>
      <Overlay isOpen={isLoading} animationData={JSON.parse(JSON.stringify(animationData))} />
    </>
  )
}

export default DnDMultiUpload
