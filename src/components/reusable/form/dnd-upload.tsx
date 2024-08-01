'use client'

import animationData from '@/assets/lottie/imageUploading.json'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import Overlay from '@/components/ui/overlay'
import { cn } from '@/lib/utils'
import { uploadFile } from '@/utils/files/uploadFile'
import { ImagePlus } from 'lucide-react'
import { ChangeEventHandler, DragEventHandler, useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

interface Props {
  name: string
  icon?: React.ReactNode
  text?: string
  buttonLabel?: string
  className?: string
  labelClassName?: string
  containerClassName?: string
  cb?: (arg0: string) => void
  label: string
  showLabel?: boolean
  required?: boolean
}

const DnDUpload = ({
  name,
  icon,
  text,
  buttonLabel,
  label,
  showLabel = false,
  required = false,
  className,
  labelClassName,
  containerClassName,
  cb = () => {},
  ...rest
}: Props) => {
  const {
    register,
    setValue,
    trigger,
    formState: { errors }
  } = useFormContext()

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
      if (typeof fileURL === 'string') {
        setValue(name, fileURL, { shouldValidate: true, shouldDirty: true })
      } else if (fileURL.code === 'ERR_NETWORK') {
        toast.error('Network Error, try again!')
      } else {
        toast.error('Something went wrong, try again!')
      }
      trigger(name) // Manually trigger validation for the field
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    } catch (error) {
      setIsUploading(false)
      if (inputBtnRef.current) inputBtnRef.current.value = ''
    }
  }

  return (
    <>
      <div className={cn(containerClassName, { 'flex flex-col gap-y-2': label && showLabel })}>
        {label && showLabel && (
          <Label className={cn('text-text-primary', labelClassName)}>
            {label}
            {required ? '*' : null}
          </Label>
        )}

        <div
          className={cn(
            'border-2 rounded-2xl border-dashed p-5 sm:p-10 text-center flex flex-col items-center justify-center bg-gray50',
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
                <div className='p-3.5 bg-secondary rounded-full'>
                  {icon ? icon : <ImagePlus className='text-primary' size={20} strokeWidth={2} />}
                </div>
                <p>{text || 'Drag and drop file here, or click the button below to select file'}</p>
              </div>
            )}
          </div>
          <input type='file' ref={inputBtnRef} onChange={handleChange} className='hidden' id='file-upload' {...rest} />
          <Button onClick={handleButtonClick} variant='secondary' className='h-10 rounded-md'>
            {buttonLabel || 'Select File'}
          </Button>
        </div>

        <input type='hidden' {...register(name, { required })} />

        {required ? (
          <div className='flex justify-start mt-2'>
            {errors[name] && errors[name]?.type === 'required' ? (
              <span className='text-red-500 text-xs h-5 leading-none !text-left'>{label} is required</span>
            ) : (
              <div className='w-full h-5' />
            )}
          </div>
        ) : null}
      </div>
      <Overlay isOpen={isUploading} animationData={JSON.parse(JSON.stringify(animationData))} />
    </>
  )
}

export default DnDUpload
