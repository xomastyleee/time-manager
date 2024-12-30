import { useCallback, useRef, useState } from 'react'
import { useWindowDimensions, View } from 'react-native'

/* 
  We have to multiply the base values
  because the height of the content also takes into account the size
  of padding, margin, borders, shadows, etc.
*/
const TAB_BAR_HEIGHT = 65 * 1.3
const MAIN_HEADER_HEIGHT = 40 * 1.3
const MAIN_GAP = 30

export const useCalculatedScreenGap = () => {
  const [gap, setGap] = useState(0)
  const viewRef = useRef<View | null>(null)
  const { height: windowHeight } = useWindowDimensions()

  const handleLayout = useCallback(() => {
    viewRef.current?.measure((_, __, ___, height) => {
      const contentView = windowHeight - TAB_BAR_HEIGHT - MAIN_HEADER_HEIGHT - MAIN_GAP * 1.5

      if (height > contentView) {
        setGap(MAIN_GAP)
      } else {
        setGap(0)
      }
    })
  }, [windowHeight])

  return { gap, viewRef, handleLayout }
}
