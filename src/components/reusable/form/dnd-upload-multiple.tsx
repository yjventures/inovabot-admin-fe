/* eslint-disable no-unused-vars */
'use client'

import animationData from '@/assets/lottie/imageUploading.json'
import { Button } from '@/components/ui/button'
import Overlay from '@/components/ui/overlay'
import { cn } from '@/lib/utils'
import { uploadFile } from '@/utils/files/uploadFile'
import { ImageIcon, LucideProps } from 'lucide-react'
import {
  ChangeEventHandler,
  DragEventHandler,
  ForwardRefExoticComponent,
  InputHTMLAttributes,
  RefAttributes,
  useRef,
  useState
} from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'
import FormFieldError from './form-field-error'
import FormLabel from './form-label'

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  name?: string
  icon?: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  text?: string
  buttonLabel?: string
  className?: string
  labelClassName?: string
  containerClassName?: string
  cb?: (arg0: string[]) => void
  label?: string
  required?: boolean
  id?: string
  description?: string
  maxFiles?: number
}

const DnDUploadMultiple = ({
  name,
  icon: Icon,
  text,
  buttonLabel,
  label,
  required = false,
  className,
  labelClassName,
  containerClassName,
  description,
  id,
  cb = () => {},
  maxFiles = 5,
  ...rest
}: Props) => {
  const formContext = useFormContext()
  const { register, setValue, trigger, formState } = { ...formContext } || {}

  const { errors } = formState || {}

  const [files, setFiles] = useState<File[]>([])
  const [uploadedUrls, setUploadedUrls] = useState<string[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const inputBtnRef = useRef<HTMLInputElement | null>(null)

  const handleDrop: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    const droppedFiles = Array.from(e.dataTransfer.files)
    handleFiles(droppedFiles)
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const selectedFiles = Array.from(e.target.files || [])
    handleFiles(selectedFiles)
  }

  const handleFiles = (newFiles: File[]) => {
    const totalFiles = [...files, ...newFiles].slice(0, maxFiles)
    setFiles(totalFiles)
    uploadFiles(totalFiles)
  }

  const handleButtonClick = () => {
    if (inputBtnRef.current) {
      inputBtnRef.current.click()
    }
  }

  const uploadFiles = async (filesToUpload: File[]) => {
    setIsUploading(true)
    const newUrls: string[] = []

    for (const file of filesToUpload) {
      try {
        const fileURL = await uploadFile(file)
        if (typeof fileURL === 'string') {
          newUrls.push(fileURL)
        } else if (fileURL.code === 'ERR_NETWORK') {
          toast.error('Network Error, try again!')
        } else {
          toast.error('Something went wrong, try again!')
        }
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`)
      }
    }

    setUploadedUrls(prevUrls => [...prevUrls, ...newUrls])
    cb([...uploadedUrls, ...newUrls])
    if (name && setValue && trigger) {
      setValue(name, [...uploadedUrls, ...newUrls], { shouldValidate: true, shouldDirty: true })
      trigger(name)
    }

    setIsUploading(false)
    if (inputBtnRef.current) inputBtnRef.current.value = ''
  }

  const removeFile = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newUrls = uploadedUrls.filter((_, i) => i !== index)
    setFiles(newFiles)
    setUploadedUrls(newUrls)
    cb(newUrls)
    if (name && setValue && trigger) {
      setValue(name, newUrls, { shouldValidate: true, shouldDirty: true })
      trigger(name)
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
            {files.length > 0 ? (
              <div className='space-y-2'>
                {files.map((file, index) => (
                  <p key={index}>{file.name}</p>
                ))}
              </div>
            ) : (
              <div className='flex flex-col items-center justify-center gap-4'>
                <div className='p-3.5 bg-black rounded-lg'>
                  {Icon ? (
                    <Icon className='text-foreground' size={20} strokeWidth={2} />
                  ) : (
                    <ImageIcon className='text-foreground' size={20} strokeWidth={2} />
                  )}
                </div>
                <div className='space-y-1'>
                  <p className='text-text-gray-light'>
                    {text || 'Drag and drop files here, or click the button below to select files'}
                  </p>
                  <p className='text-text-gray font-medium italic'>{description}</p>
                </div>
              </div>
            )}
          </div>
          <input
            type='file'
            ref={inputBtnRef}
            onChange={handleChange}
            className='hidden'
            id='file-upload'
            multiple
            {...rest}
          />
          <Button
            onClick={handleButtonClick}
            variant='secondary'
            className='h-10 bg-magenta-light font-bold hover:bg-magenta-primary hover:text-foreground'
            disabled={files.length >= maxFiles}
          >
            {buttonLabel || 'Select Files'}
          </Button>
          {files.length >= maxFiles && (
            <p className='text-sm text-red-500 mt-2'>Maximum number of files reached ({maxFiles})</p>
          )}
        </div>

        <input type='hidden' {...(name && register ? register(name) : {})} />

        {name && <FormFieldError name={name} required={required} label={label} errors={errors} />}
      </div>
      <Overlay isOpen={isUploading} animationData={JSON.parse(JSON.stringify(animationData))} />
    </>
  )
}

export default DnDUploadMultiple
