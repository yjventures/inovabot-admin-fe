import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Eye } from 'lucide-react'

interface Props {
  faq: {
    question: string
    answer: string
  }
}

export default function FAQDetailsModal({ faq }: Props) {
  const { question, answer } = { ...faq }
  return (
    <Dialog>
      <DialogTrigger>
        <Eye />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{question}</DialogTitle>
          <DialogDescription>{answer}</DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
