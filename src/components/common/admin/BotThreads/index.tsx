'use client'

import { useState } from 'react'
import ThreadMessages from './ThreadMessages'
import ThreadsSidebar from './ThreadsSidebar'

export default function BotThreads() {
  const [currThread, setcurrThread] = useState<undefined | string>(undefined)
  return (
    <div>
      <ThreadsSidebar currThread={currThread} setcurrThread={setcurrThread} />
      <ThreadMessages currThread={currThread} />
    </div>
  )
}
