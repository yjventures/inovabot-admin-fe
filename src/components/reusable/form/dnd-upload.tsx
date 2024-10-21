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
  cb?: (arg0: string) => void
  label?: string
  required?: boolean
  id?: string
  description?: string
}

const DnDUpload = ({
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
  ...rest
}: Props) => {
  const formContext = useFormContext()
  const {
    register,
    setValue,
    trigger,
    formState: { errors }
  } = formContext || {}

  const [file, setFile] = useState<File | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const inputBtnRef = useRef<HTMLInputElement | null>(null)

  const handleDrop: DragEventHandler<HTMLDivElement> = e => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files.length) {
      setFile(files[0])
      uploadFileFn(files[0])
    }
  }

  const handleChange: ChangeEventHandler<HTMLInputElement> = e => {
    const files = e.target.files
    if (files?.length) {
      setFile(files[0])
      uploadFileFn(files[0])
    }
  }

  const handleButtonClick = () => {
    if (inputBtnRef.current) {
      inputBtnRef.current?.click()
    }
  }

  const uploadFileFn = async (file: File) => {
    try {
      setIsUploading(true)
      const fileURL = await uploadFile(file)
      cb(fileURL)
      if (typeof fileURL === 'string') {
        if (name) setValue(name, fileURL, { shouldValidate: true, shouldDirty: true })
      } else if (fileURL.code === 'ERR_NETWORK') {
        toast.error('Network Error, try again!')
      } else {
        toast.error('Something went wrong, try again!')
      }
      if (name) trigger(name) // Manually trigger validation for the field
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    } catch (error) {
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
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
            {file ? (
              <p>{file.name}</p>
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
                    {text || 'Drag and drop file here, or click the button below to select file'}
                  </p>
                  <p className='text-text-gray font-medium italic'>{description}</p>
                </div>
              </div>
            )}
          </div>
          <input type='file' ref={inputBtnRef} onChange={handleChange} className='hidden' id='file-upload' {...rest} />
          <Button
            onClick={handleButtonClick}
            variant='secondary'
            className='h-10 bg-magenta-light font-bold hover:bg-magenta-primary hover:text-foreground'
          >
            {buttonLabel || 'Select File'}
          </Button>
        </div>

        <input type='hidden' {...(name && formContext ? register(name) : {})} />

        <FormFieldError name={name} required={required} label={label} errors={errors} />
      </div>
      <Overlay isOpen={isUploading} animationData={JSON.parse(JSON.stringify(animationData))} />
    </>
  )
}

export default DnDUpload
