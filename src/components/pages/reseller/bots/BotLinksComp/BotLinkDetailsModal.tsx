import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTrigger } from '@/components/ui/dialog'
import { IBotLink } from '@/types/ILink'
import { Eye } from 'lucide-react'

interface Props {
  botLink: IBotLink
}

export default function BotLinkDetailsModal({ botLink }: Props) {
  const { link, objective } = { ...botLink }
  return (
    <Dialog>
      <DialogTrigger>
        <Eye />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogDescription>
            <p className='mb-2 font-medium break-words break-all'>
              Link: <span className='text-blue-primary font-normal'>{link}</span>
            </p>
            <p className='font-medium'>
              Objective: <span className='font-normal'>{objective}</span>
            </p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
