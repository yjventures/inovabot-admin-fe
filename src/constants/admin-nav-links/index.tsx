import { LucideProps } from 'lucide-react'
import { ForwardRefExoticComponent, RefAttributes } from 'react'

export interface AdminLinkBase {
  id: number
  label: string
  hasChildren: boolean
  icon: ForwardRefExoticComponent<Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>>
  href: string
}

export interface AdminLinkWithHref extends AdminLinkBase {
  hasChildren: false
}

export interface AdminLinkWithChildren extends AdminLinkBase {
  hasChildren: true
  childrenLinks: {
    id: number
    label: string
    href: string
  }[]
}

export type AdminLink = AdminLinkWithHref | AdminLinkWithChildren

export { platformAdminLinks } from './platform-admin-links'
