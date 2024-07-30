'use client'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import LLink from '@/components/ui/llink'
import { AdminLink } from '@/constants/admin-nav-links'
import { cn } from '@/lib/utils'
import { usePathname } from 'next/navigation'
import React from 'react'

interface Props {
  links: Array<AdminLink>
}

export default function AdminLinks({ links }: Props) {
  const pathname = usePathname()
  return (
    <ul className='flex flex-col items-center w-full px-2'>
      {links.map(link =>
        link.hasChildren ? (
          <li key={link.id} className='w-full'>
            <Accordion type='single' collapsible>
              <AccordionItem value='item-1'>
                <AccordionTrigger>{link.label}</AccordionTrigger>
                <AccordionContent>
                  {link.childrenLinks.map(childLink => (
                    <LLink href={childLink.href} key={childLink.id}>
                      <button
                        className={cn(
                          'w-full rounded-lg text-gray-light p-3 text-left hover:bg-[#0f172a] text-white/70',
                          {
                            'bg-[#0f172a] text-white font-medium': pathname.includes(childLink.href)
                          }
                        )}
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
          <li key={link.id} className='w-full'>
            <LLink href={link.href}>
              <button
                className={cn('w-full rounded-lg text-gray-light p-3 text-left hover:bg-[#0f172a] text-white/70', {
                  'bg-[#0f172a] text-white font-medium': pathname.includes(link.href)
                })}
              >
                {link.label}
              </button>
            </LLink>
          </li>
        )
      )}
    </ul>
  )
}
