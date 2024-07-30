export interface AdminLinkBase {
  id: number
  label: string
  hasChildren: boolean
}

export interface AdminLinkWithHref extends AdminLinkBase {
  hasChildren: false
  href: string
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
