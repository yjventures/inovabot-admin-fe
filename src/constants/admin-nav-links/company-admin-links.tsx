import { BaggageClaim, Blocks, Boxes, MessagesSquare } from 'lucide-react'
import { AdminLink } from '.'

export const companymAdminLinks: Array<AdminLink> = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/company/dashboard',
    hasChildren: false,
    icon: Blocks
  },
  {
    id: 2,
    label: 'Company',
    hasChildren: false,
    icon: BaggageClaim,
    href: '/company/details'
  },
  {
    id: 3,
    label: 'Chat Agents',
    href: '/company/bots',
    hasChildren: true,
    icon: MessagesSquare,
    childrenLinks: [{ id: 1, label: 'Create', href: '/company/bots/create' }]
  },
  {
    id: 4,
    label: 'Packages',
    hasChildren: true,
    icon: Boxes,
    href: '/company/packages',
    childrenLinks: [{ id: 1, label: 'Create', href: '/company/packages/create' }]
  }
]
