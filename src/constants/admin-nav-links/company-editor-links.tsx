import { BaggageClaim, Blocks, Boxes, MessagesSquare, Users } from 'lucide-react'
import { AdminLink } from '.'

export const companyEditorLinks: Array<AdminLink> = [
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
    label: 'Team',
    hasChildren: true,
    icon: Users,
    href: '/company/team',
    childrenLinks: [{ id: 1, label: 'Add Team Member', href: '/company/team/invite' }]
  },
  {
    id: 5,
    label: 'Subscriptions',
    hasChildren: false,
    icon: Boxes,
    href: '/company/subscriptions'
  }
]
