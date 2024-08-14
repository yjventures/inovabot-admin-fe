import { BaggageClaim, Blocks, MessagesSquare, UserPlus } from 'lucide-react'
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
    href: '/admin/chat-agents',
    hasChildren: false,
    icon: MessagesSquare
  },
  {
    id: 4,
    label: 'Analytics',
    hasChildren: true,
    icon: UserPlus,
    href: '/admin/analytics',
    childrenLinks: [
      { id: 1, label: 'Financial', href: '/admin/analytics' },
      { id: 2, label: 'Analytics', href: '/admin/analytics/analytics' },
      { id: 3, label: 'View All', href: '/admin/analytics/view-all' },
      { id: 4, label: 'Leads', href: '/admin/analytics/leads' }
    ]
  }
]
