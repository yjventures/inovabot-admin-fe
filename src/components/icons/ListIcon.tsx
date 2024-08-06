import React from 'react'

interface Props extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export default function ListIcon({ className, ...props }: Props) {
  return (
    <svg
      width='18'
      height='16'
      viewBox='0 0 18 16'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      className={className}
      {...props}
    >
      <path
        d='M16.5 9.5H1.5C1.08579 9.5 0.75 9.83579 0.75 10.25V14C0.75 14.4142 1.08579 14.75 1.5 14.75H16.5C16.9142 14.75 17.25 14.4142 17.25 14V10.25C17.25 9.83579 16.9142 9.5 16.5 9.5Z'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
      <path
        d='M16.5 1.25H1.5C1.08579 1.25 0.75 1.58579 0.75 2V5.75C0.75 6.16421 1.08579 6.5 1.5 6.5H16.5C16.9142 6.5 17.25 6.16421 17.25 5.75V2C17.25 1.58579 16.9142 1.25 16.5 1.25Z'
        stroke='currentColor'
        stroke-width='1.5'
        stroke-linecap='round'
        stroke-linejoin='round'
      />
    </svg>
  )
}
