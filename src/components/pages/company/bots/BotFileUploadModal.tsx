'use client'

import DnDMultiUpload from '@/components/reusable/form/dnd-multi-upload'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { useGetBotQuery } from '@/redux/features/botsApi'
import { FilePlus } from 'lucide-react'
import { useState } from 'react'

export default function BotFileUploadModal({ botId }: { botId: string }) {
  const [open, setopen] = useState<boolean>(false)
  const { data } = useGetBotQuery(botId)
  return (
    <Dialog open={open} onOpenChange={setopen}>
      <DialogTrigger>
        <Button variant='black' icon={<FilePlus />}>
          Add Files
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload Files</DialogTitle>
          <DialogDescription>Upload files to your bot</DialogDescription>
        </DialogHeader>

        <DnDMultiUpload
          bot_id={botId as string}
          accept='.pdf,.doc,.docx,.txt,.md'
          containerClassName='max-w-md w-full'
          companyId={data?.data?.company_id!}
          cb={() => setopen(false)}
          className='w-full'
        />
      </DialogContent>
    </Dialog>
  )
}
