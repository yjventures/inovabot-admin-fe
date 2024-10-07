import hljs from 'highlight.js'
import 'highlight.js/styles/github-dark.css' // Use a theme from highlight.js
import { useEffect, useRef, useState } from 'react'

const escapeHtml = text => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
    .replace(/{/g, '&#123;')
    .replace(/}/g, '&#125;')
}

const HighlightTextarea = () => {
  const [inputText, setInputText] = useState(`
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
          <iframe src="https://api.inovasolutions.ai/bot_en_v2/1719909822586x489736361986490400" frameborder="0" allowfullscreen="" style="position:absolute;top:0;left:0;width:100%;height:100vh;" allow="camera; microphone"></iframe>
        </div>
      </div>
      <script>
        navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      </script>
  `)
  const [highlightedCode, setHighlightedCode] = useState('')
  const textareaRef = useRef(null)
  const highlightRef = useRef(null)

  useEffect(() => {
    // Update the highlighted code whenever the input changes and escape HTML characters
    const escapedCode = escapeHtml(inputText)
    setHighlightedCode(hljs.highlightAuto(escapedCode).value)
  }, [inputText])

  const handleInputChange = e => {
    setInputText(e.target.value)
  }

  const syncScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      // Sync the scroll position of the highlight div with the textarea
      highlightRef.current.scrollTop = textareaRef.current.scrollTop
      highlightRef.current.scrollLeft = textareaRef.current.scrollLeft
    }
  }

  return (
    <div className='relative w-full'>
      {/* Highlighted text overlay */}
      <div
        ref={highlightRef}
        className='absolute inset-0 p-2 bg-black text-white rounded overflow-hidden pointer-events-none'
        aria-hidden='true'
        style={{
          whiteSpace: 'pre-wrap',
          wordWrap: 'break-word',
          zIndex: 1
        }}
        dangerouslySetInnerHTML={{ __html: highlightedCode }}
      />

      {/* Textarea for input */}
      <textarea
        ref={textareaRef}
        value={inputText}
        onChange={handleInputChange}
        onScroll={syncScroll}
        className='relative w-full p-2 bg-black text-white border border-gray-700 rounded focus:outline-none'
        style={{
          position: 'relative',
          zIndex: 2,
          caretColor: 'white',
          color: 'transparent', // Make the text transparent
          background: 'transparent'
        }}
        rows={10}
        placeholder='Enter your code here...'
      />
    </div>
  )
}

export default HighlightTextarea
