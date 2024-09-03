import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'
import { IFAQ } from '../UpdateBotForm/FAQ'

interface Props {
  faq: IFAQ
}

export default function FAQDetailsModal({ faq }: Props) {
  const { question, objective } = { ...faq }
  return (
    <Dialog>
      <DialogTrigger>
        <Eye />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{question}</DialogTitle>
          <DialogDescription>{objective}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
