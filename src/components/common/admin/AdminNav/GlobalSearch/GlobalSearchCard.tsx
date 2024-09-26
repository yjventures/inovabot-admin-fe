import CardAvatar from '@/components/reusable/cards/commonn/card-avatar'
import CardWrapper from '@/components/reusable/cards/commonn/card-wrapper'
import { Button } from '@/components/ui/button'
import LLink from '@/components/ui/llink'
import { getDashboardURLPath } from '@/helpers/common'

interface Props {
  closeResults: () => void
  data: {
    id: string
    name: string
    description?: string
    logo?: string
    type: string
  }
}

export default function GlobalSearchCard({ data, closeResults }: Props) {
  return (
    <CardWrapper className='p-2'>
      <div className='flex items-center gap-x-3 mb-2'>
        <CardAvatar name={data?.name} imgSrc={data?.logo} className='size-12' />
        <p className='text-text-primary text-base font-semibold'>{data?.name}</p>
      </div>
      {data?.description && <p className='text-text-secondary text-sm font-medium mb-2'>{data?.description}</p>}
      <LLink
        href={
          data?.type === 'bot'
            ? `${getDashboardURLPath()}/bots/${data.id}`
            : `${getDashboardURLPath()}/companies/${data.id}`
        }
      >
        <Button size='sm' variant='gradient' className='text-[13px] px-3 py-1 h-8' onClick={closeResults}>
          {data.type === 'bot' ? 'Bot details' : 'Company details'}
        </Button>
      </LLink>
    </CardWrapper>
  )
}
