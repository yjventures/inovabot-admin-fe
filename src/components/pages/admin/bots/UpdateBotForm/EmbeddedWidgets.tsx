'use client'

import FormWrapper from '@/components/reusable/form/form-wrapper'
import MarkdownRenderer from '@/components/reusable/form/markdown-renderer'
import SingleAccordion from '@/components/reusable/form/single-accordion'
import { BOT_URL } from '@/configs'
import { Copy } from 'lucide-react'
import { useFormContext } from 'react-hook-form'
import toast from 'react-hot-toast'

export default function EmbeddedWidgets() {
  const { watch } = useFormContext()
  const embedding_url = watch('embedding_url')
  const url = `${BOT_URL}/${embedding_url}`

  const code: string = `
\`\`\`html
<style>
  body {
    overflow: hidden;
    width: 100%;
    margin-left: 0px;
    margin-top: 0px;
  }
</style>
</head>
<body>
  <div>
    <div style="position:relative;padding-top:56.25%;">
      <iframe src="${url}" frameborder="0" allowfullscreen="" style="position:absolute;top:0;left:0;width:100%;height:100vh;" allow="camera; microphone"></iframe>
    </div>
  </div>
  <script>
    navigator.mediaDevices.getUserMedia({ audio: true, video: false });
  </script>
\`\`\`
`

  return (
    <FormWrapper>
      <SingleAccordion value='widget' label='Embeddable Widget'>
        <div className='relative max-w-4xl'>
          <MarkdownRenderer className='markdown text-sm max-w-full w-full'>{code}</MarkdownRenderer>
          <Copy
            className='absolute top-2 right-2 text-gray-500 hover:text-gray-600 cursor-pointer'
            size={20}
            onClick={() => {
              navigator.clipboard
                .writeText(code)
                .then(() => {
                  // Assuming a toast function is available
                  toast.success('Code copied to clipboard!')
                })
                .catch(err => {
                  console.error('Failed to copy: ', err)
                })
            }}
          />
        </div>
      </SingleAccordion>
    </FormWrapper>
  )
}
