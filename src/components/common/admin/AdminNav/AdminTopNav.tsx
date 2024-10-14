'use client'

import ThemeSwitcher from '@/components/reusable/common/theme_switcher'
import { IUser } from '@/types/IUser'
import { AlignRight } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import GlobalSearch from './GlobalSearch'
import UserInfo from './UserInfo'

interface Props {
  user: IUser
  navbarOpen: boolean
  setnavbarOpen: Dispatch<SetStateAction<boolean>>
}

export default function AdminTopNav({ user, navbarOpen, setnavbarOpen }: Props) {
  return (
    <nav className='fixed top-0 left-0 lg:left-[264px] w-full lg:w-[calc(100%_-_230px)] h-20 flex items-center justify-end md:justify-between p-7 gap-5 bg-background z-50'>
      <GlobalSearch />

      <div className='flex items-center justify-end gap-4 w-auto md:w-full'>
        {/* <div className='flex items-center gap-4 text-text-primary-muted'>
          <CalendarDays className='size-6' />
          <Bell className='size-6' />
          <Mail className='size-6' />
          <MessageSquareMore className='size-6' />
        </div> */}

        {/* <div className='w-px h-10 bg-gray-primary bg-opacity-40' /> */}

        <ThemeSwitcher />
        <UserInfo user={user} className='hidden md:flex mr-3' />

        <AlignRight
          className='inline-block lg:hidden size-6 text-text-primary cursor-pointer'
          onClick={() => setnavbarOpen(!navbarOpen)}
        />
      </div>
    </nav>
  )
}
