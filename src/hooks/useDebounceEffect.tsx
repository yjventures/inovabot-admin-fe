/* eslint-disable no-unused-vars */
import { DependencyList, useEffect } from 'react'

export function useDebounceEffect(
  fn: { apply: (arg0: undefined, arg1: any) => void },
  waitTime: number | undefined,
  deps: DependencyList | undefined
) {
  useEffect(() => {
    const t = setTimeout(() => {
      fn.apply(undefined, deps)
    }, waitTime)

    return () => {
      clearTimeout(t)
    }
  }, [deps, fn, waitTime])
}
