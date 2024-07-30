'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LLink from '@/components/ui/llink'
import { AdminLink } from '@/constants/admin-nav-links'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'
import { useLocale } from '@/hooks/useLocale'

interface Props {
  links: Array<AdminLink>
}

export default function AdminLinks({ links }: Props) {
  const pathname = usePathname()
  const locale = useLocale()

  const isNestedActive = (link: {
    childrenLinks: {
      href: string
    }[]
  }) => {
    return link.childrenLinks.map(l => `/${locale}${l.href}`).includes(pathname)
  }

  return (
    <ul className='flex flex-col items-center w-full overflow-x-hidden'>
      {links.map(link =>
        link.hasChildren ? (
          <li key={link.id} className='w-full'>
            <Accordion type='single' collapsible>
              <AccordionItem value={String(link.id)} className='border-b-0'>
                <AccordionTrigger
                  className={cn('py-0 hover:no-underline hover:bg-gray-primary', {
                    'font-bold bg-gray-primary': isNestedActive(link)
                  })}
                >
                  <div className='relative'>
                    <div
                      key={link.id}
                      className={cn(
                        'text-gray-light text-left text-sm text-text-primary h-12 flex items-center w-full'
                      )}
                    >
                      <span className='ml-5 mr-2'>
                        <link.icon
                          className={cn('size-5 text-text-gray-light', {
                            'text-text-primary': isNestedActive(link)
                          })}
                          strokeWidth={isNestedActive(link) ? 2 : 1.5}
                        />
                      </span>
                      {link.label}
                    </div>
                    {isNestedActive(link) && (
                      <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-dark to-cyan-dark' />
                    )}
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {link.childrenLinks.map(childLink => (
                    <LLink href={childLink.href} key={childLink.id} className='flex items-center h-11 pl-14'>
                      <button
                        className={cn('w-full rounded-lg text-text-primary text-left hover:font-bold', {
                          'font-bold': pathname.includes(childLink.href)
                        })}
                      >
                        {childLink.label}
                      </button>
                    </LLink>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </li>
        ) : (
          <li key={link.id} className='w-full relative hover:bg-gray-primary'>
            <LLink
              href={link.href}
              className={cn('w-full text-gray-light text-left text-sm text-text-primary h-12 flex items-center', {
                'font-bold bg-gray-primary': pathname.includes(link.href)
              })}
            >
              <span className='ml-5 mr-2'>
                <link.icon
                  className={cn('size-5 text-text-gray-light', { 'text-text-primary': pathname.includes(link.href) })}
                  strokeWidth={pathname.includes(link.href) ? 2 : 1.5}
                />
              </span>
              {link.label}
            </LLink>
            {pathname.includes(link.href) && (
              <div className='absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-blue-dark to-cyan-dark' />
            )}
          </li>
        )
      )}
    </ul>
  )
}
