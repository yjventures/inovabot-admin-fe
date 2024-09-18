import { BaggageClaim, Blocks, BookUser, Boxes, ChartBarStacked, MessagesSquare, TextSelect } from 'lucide-react'
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
    label: 'Resellers',
    hasChildren: true,
    icon: BookUser,
    href: '/admin/resellers',
    childrenLinks: [
      { id: 1, label: 'View All', href: '/admin/resellers' },
      { id: 2, label: 'Invite Reseller', href: '/admin/resellers/invite' }
    ]
  },
  {
    id: 4,
    label: 'Chat Agents',
    href: '/admin/bots',
    hasChildren: true,
    icon: MessagesSquare,
    childrenLinks: [
      { id: 1, label: 'View All', href: '/admin/bots' },
      { id: 2, label: 'Create', href: '/admin/bots/create' }
    ]
  },
  {
    id: 5,
    label: 'Bot Templates',
    href: '/admin/templates',
    hasChildren: true,
    icon: TextSelect,
    childrenLinks: [
      { id: 1, label: 'View All', href: '/admin/templates' },
      { id: 2, label: 'Create', href: '/admin/templates/create' }
    ]
  },
  {
    id: 6,
    label: 'Packages',
    hasChildren: true,
    icon: Boxes,
    href: '/admin/packages',
    childrenLinks: [
      { id: 1, label: 'View all', href: '/admin/packages' },
      { id: 2, label: 'Create', href: '/admin/packages/create' }
    ]
  },
  {
    id: 7,
    label: 'Bot Categories',
    hasChildren: false,
    icon: ChartBarStacked,
    href: '/admin/bot-categories'
  }
]
