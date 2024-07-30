import { AdminLink } from '.'

export const platformAdminLinks: Array<AdminLink> = [
  {
    id: 1,
    label: 'Dashboard',
    href: '/admin/dashboard',
    hasChildren: false
  },
  {
    id: 2,
    label: 'Companies',
    hasChildren: true,
    childrenLinks: [
      { id: 1, label: 'View All', href: '/admin/companies' },
      { id: 2, label: 'Analytics', href: '/admin/companies/analytics' }
    ]
  },
  {
    id: 3,
    label: 'Chat Agents',
    href: '/admin/chat-agents',
    hasChildren: false
  },
  {
    id: 4,
    label: 'Analytics',
    hasChildren: true,
    childrenLinks: [
      { id: 1, label: 'Financial', href: '/admin/analytics/' },
      { id: 2, label: 'Analytics', href: '/admin/analytics/analytics' },
      { id: 3, label: 'View All', href: '/admin/analytics/view-all' },
      { id: 4, label: 'Leads', href: '/admin/analytics/leads' }
    ]
  }
]
