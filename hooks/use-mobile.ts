import * as React from 'react'

const MOBILE_BREAKPOINT = 768

function computeIsMobile() {
  if (typeof window === 'undefined') return undefined

  // Many phones/tablets use touch devices even if their viewport width
  // slightly exceeds the numeric breakpoint.
  const pointerCoarse = window.matchMedia?.('(pointer: coarse)')?.matches
  const hoverNone = window.matchMedia?.('(hover: none)')?.matches

  return Boolean(pointerCoarse || hoverNone || window.innerWidth < MOBILE_BREAKPOINT)
}

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(() =>
    computeIsMobile()
  )

  React.useEffect(() => {
    const onChange = () => {
      setIsMobile(computeIsMobile())
    }

    const pointerMql = window.matchMedia?.('(pointer: coarse)')
    const hoverMql = window.matchMedia?.('(hover: none)')
    const widthMql = window.matchMedia?.(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)

    pointerMql?.addEventListener?.('change', onChange)
    hoverMql?.addEventListener?.('change', onChange)
    widthMql?.addEventListener?.('change', onChange)

    window.addEventListener('resize', onChange)
    onChange()

    return () => {
      pointerMql?.removeEventListener?.('change', onChange)
      hoverMql?.removeEventListener?.('change', onChange)
      widthMql?.removeEventListener?.('change', onChange)
      window.removeEventListener('resize', onChange)
    }
  }, [])

  return !!isMobile
}
