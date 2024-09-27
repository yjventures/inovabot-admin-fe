import { BaggageClaim, Blocks, MessagesSquare, Users } from 'lucide-react'
import { AdminLink } from '.'

export const resellerAdminLinks: Array<AdminLink> = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/reseller/dashboard',
    hasChildren: false,
    icon: Blocks
  },
  {
    id: 2,
    label: 'Company',
    hasChildren: true,
    icon: BaggageClaim,
    href: '/reseller/companies',
    childrenLinks: [
      { id: 1, label: 'View All', href: '/reseller/companies' },
      { id: 2, label: 'Create', href: '/reseller/companies/create' }
    ]
  },
  {
    id: 3,
    label: 'Chat Agents',
    href: '/reseller/bots',
    hasChildren: true,
    icon: MessagesSquare,
    childrenLinks: [
      { id: 1, label: 'View All', href: '/reseller/bots' },
      { id: 2, label: 'Create', href: '/reseller/bots/create' }
    ]
  },
  {
    id: 4,
    label: 'Team',
    hasChildren: false,
    icon: Users,
    href: '/reseller/team'
  }
  // {
  //   id: 5,
  //   label: 'Subscriptions',
  //   hasChildren: false,
  //   icon: Boxes,
  //   href: '/reseller/subscriptions'
  // }
]
