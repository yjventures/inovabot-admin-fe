import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { CheckCircle, XCircle } from 'lucide-react'

interface Props {
  title?: string
  open: boolean
  // eslint-disable-next-line no-unused-vars
  onOpenChange: (open: boolean) => void
  cb: () => void
  isLoading?: boolean
  rejectionCb?: () => void
}

export default function ConfirmationPrompt({
  title,
  open,
  onOpenChange,
  cb,
  isLoading = false,
  rejectionCb = () => {}
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-sm rounded-lg'>
        <DialogHeader className='sm:text-center'>
          <DialogTitle>{title || 'Are you sure?'}</DialogTitle>
        </DialogHeader>
        <DialogFooter className='items-center sm:justify-center justify-center flex-row gap-5 mt-10'>
          <DialogClose>
            <Button
              className='px-8 flex items-center gap-2 rounded-lg h-12 bg-emerald-500 hover:bg-emerald-500/90 transition-colors'
              isLoading={isLoading}
              onClick={cb}
            >
              <CheckCircle className='w-5 h-5' /> Yes
            </Button>
          </DialogClose>
          <DialogClose>
            <Button
              className='px-8 flex items-center gap-2 rounded-lg h-12'
              variant='destructive'
              onClick={rejectionCb}
            >
              <XCircle className='w-5 h-5' /> No
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
