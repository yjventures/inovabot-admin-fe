import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export default function GridIcon({ className, ...props }: Props) {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        d='M12 4.125V19.875M19.875 12H4.125M4.875 4.125H19.125C19.5392 4.125 19.875 4.46079 19.875 4.875V19.125C19.875 19.5392 19.5392 19.875 19.125 19.875H4.875C4.46079 19.875 4.125 19.5392 4.125 19.125V4.875C4.125 4.46079 4.46079 4.125 4.875 4.125Z'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
