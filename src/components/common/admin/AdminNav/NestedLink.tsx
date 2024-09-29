'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LLink from '@/components/ui/llink'
import { AdminLinkWithChildren } from '@/constants/admin-nav-links'
import { useLocale } from '@/hooks/useLocale'
import { cn } from '@/lib/utils'
import { setCookie } from 'cookies-next'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useState } from 'react'

interface NestedChildLink {
  id: number
  label: string
  href: string
}

interface Props {
  link: AdminLinkWithChildren
  currentLink?: string
  setnavbarOpen: Dispatch<SetStateAction<boolean>>
}

const NestedLink = ({ link, currentLink, setnavbarOpen }: Props) => {
  const pathname = usePathname()
  const locale = useLocale()
  const [value, setvalue] = useState<string | undefined>(undefined)

  const isNestedActive = (link: { childrenLinks: Array<NestedChildLink> }) => {
    return link.childrenLinks.some(l => pathname === `/${locale}${l.href}`) // Match exactly with the current path
  }

  return (
    <Accordion
      type='single'
      collapsible
      value={value}
      defaultValue={
        currentLink
          ? link.childrenLinks.map(l => l.href).includes(currentLink)
            ? String(link.id)
            : undefined
          : undefined
      }
      onValueChange={val => setvalue(String(val))}
    >
      <AccordionItem value={String(link.id)} className='border-b-0'>
        <AccordionTrigger
          className={cn('py-0 hover:no-underline hover:bg-gray-primary', {
            'font-bold bg-gray-primary': isNestedActive(link) || pathname.includes(link.href)
          })}
        >
          <div className='relative' onClick={e => e.stopPropagation()}>
            <LLink
              href={link.href}
              key={link.id}
              className={cn('text-gray-light text-left text-sm text-text-primary h-12 flex items-center w-full')}
              onClick={() => setnavbarOpen(false)}
            >
              <span className='ml-5 mr-2'>
                <link.icon
                  className={cn('size-5 text-text-gray-light', {
                    'text-text-primary': isNestedActive(link)
                  })}
                  strokeWidth={isNestedActive(link) || pathname.includes(link.href) ? 2 : 1.5}
                />
              </span>
              {link.label}
            </LLink>
            {(isNestedActive(link) || pathname.includes(link.href)) && (
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-dark to-cyan-dark' />
            )}
          </div>
        </AccordionTrigger>
        <AccordionContent className='pb-0'>
          {link.childrenLinks.map(childLink => (
            <LLink
              href={childLink.href}
              key={childLink.id}
              className='flex items-center h-11 pl-14'
              onClick={() => setnavbarOpen(false)}
            >
              <button
                className={cn('w-full rounded-lg text-text-primary text-left hover:font-bold', {
                  'font-bold': pathname === `/${locale}` + childLink.href
                })}
                onClick={() => setCookie('currentNavLink', childLink.href)}
              >
                {childLink.label}
              </button>
            </LLink>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}

export default NestedLink
