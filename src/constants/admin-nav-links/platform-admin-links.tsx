import { BaggageClaim, Blocks, Boxes, MessagesSquare } from 'lucide-react'
import { AdminLink } from '.'

export const platformAdminLinks: Array<AdminLink> = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/admin/dashboard',
    hasChildren: false,
    icon: Blocks
  },
  {
    id: 2,
    label: 'Companies',
    hasChildren: true,
    icon: BaggageClaim,
    href: '/admin/companies',
    childrenLinks: [
      { id: 1, label: 'View All', href: '/admin/companies/view-all' },
      { id: 2, label: 'Create', href: '/admin/companies/create' }
    ]
  },
  {
    id: 3,
    label: 'Chat Agents',
    href: '/admin/bots',
    hasChildren: true,
    icon: MessagesSquare,
    childrenLinks: [{ id: 1, label: 'Create', href: '/admin/bots/create' }]
  },
  {
    id: 4,
    label: 'Packages',
    hasChildren: true,
    icon: Boxes,
    href: '/admin/packages',
    childrenLinks: [{ id: 1, label: 'Create', href: '/admin/packages/create' }]
  }
]
