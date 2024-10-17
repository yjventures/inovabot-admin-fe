'use client'

import { useState } from 'react'
import ThreadMessages from './ThreadMessages'
import ThreadsSidebar from './ThreadsSidebar'

export default function BotThreads() {
  const [currThread, setcurrThread] = useState<undefined | string>(undefined)
  const [threadSidebarOpen, setthreadSidebarOpen] = useState(true)
  return (
    <div className='-mt-4 -mb-7 -ml-7 -mr-7'>
      <ThreadsSidebar
        currThread={currThread}
        setcurrThread={setcurrThread}
        threadSidebarOpen={threadSidebarOpen}
        setthreadSidebarOpen={setthreadSidebarOpen}
      />
      <ThreadMessages
        currThread={currThread}
        threadSidebarOpen={threadSidebarOpen}
        setthreadSidebarOpen={setthreadSidebarOpen}
      />
    </div>
  )
}
