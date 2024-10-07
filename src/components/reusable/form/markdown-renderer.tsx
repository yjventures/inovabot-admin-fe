import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import Markdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface Props {
  className?: string
  codeClassName?: string
  children: ReactNode
}

export default function MarkdownRenderer({ className, codeClassName, children, ...rest }: Props) {
  return (
    // @ts-ignore
    <Markdown
      className={cn('prose', className)}
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      components={{
        // @ts-ignore
        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || '')

          return !inline && match ? (
            <SyntaxHighlighter style={dracula} PreTag='div' language={match[1]} {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code className={cn('after:hidden before:hidden', codeClassName)} {...props}>
              {children}
            </code>
          )
        }
      }}
      {...rest}
    >
      {children}
    </Markdown>
  )
}
