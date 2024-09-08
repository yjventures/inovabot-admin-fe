import logo from '@/assets/images/common/logo.png'
import { Button } from '@/components/ui/button'
import { Img } from '@/components/ui/img'
import LLink from '@/components/ui/llink'
import { AdminLink } from '@/constants/admin-nav-links'
import usePush from '@/hooks/usePush'
import { cn } from '@/lib/utils'
import { useAppDispatch } from '@/redux/hooks'
import { IUser } from '@/types/IUser'
import { logoutActions } from '@/utils/auth/logoutActions'
import { X } from 'lucide-react'
import { Dispatch, SetStateAction } from 'react'
import toast from 'react-hot-toast'
import AdminLinks from './AdminLinks'
import UserInfo from './UserInfo'

interface Props {
  user: IUser
  navbarOpen: boolean
  setnavbarOpen: Dispatch<SetStateAction<boolean>>
  currentLink?: string
  links: AdminLink[]
}

export default function AdminMobileNav({ user, navbarOpen, setnavbarOpen, currentLink, links }: Props) {
  const push = usePush()
  const dispatch = useAppDispatch()

  const handleLogout = () => {
    logoutActions(dispatch, () => {
      toast.success('Logged out successfully!')
      push('/')
      setnavbarOpen(false)
    })
  }

  return (
    <nav
      className={cn(
        'fixed top-0 right-0 bg-foreground w-[264px] h-screen flex flex-col items-center justify-between transition-all duration-500 z-50 overflow-y-auto border-l border-r-gray-primary',
        {
          '-right-[264px]': !navbarOpen
        }
      )}
    >
      <div className='flex flex-col items-center justify-center w-full'>
        <div className='flex items-center justify-between gap-4 mb-5'>
          <LLink href='/' className='w-full p-5'>
            <Img src={logo} alt='Inova' className='h-8 w-auto' />
          </LLink>
          <X
            className='text-text-primary cursor-pointer size-10'
            strokeWidth={1.5}
            onClick={() => setnavbarOpen(false)}
          />
        </div>

        <UserInfo user={user} className='flex md:hidden mb-5' darkBg />

        <AdminLinks links={links} currentLink={currentLink} setnavbarOpen={setnavbarOpen} />
      </div>

      <div className='p-5 w-full'>
        <Button onClick={handleLogout} className='w-full rounded-md h-12'>
          Log Out
        </Button>
      </div>
    </nav>
  )
}
