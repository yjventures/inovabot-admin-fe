'use client'

import { useEffect, useState } from 'react'

function useScrolling(threshold = 0) {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Check if the page is scrolled more than the threshold pixels
      const shouldSetScrolled = window.scrollY > threshold
      setIsScrolled(shouldSetScrolled)
    }

    // Add scroll event listener to window
    window.addEventListener('scroll', handleScroll)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [threshold])

  return isScrolled
}

export default useScrolling
