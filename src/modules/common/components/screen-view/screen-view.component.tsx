import React, { FC, ReactElement, ReactNode } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '@common/hooks'

import { stylesWithTheme } from './screen-view.styles'

interface ScreenViewProps {
  children: ReactElement | ReactNode
}

export const ScreenView: FC<ScreenViewProps> = ({ children }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  return (
    <SafeAreaView style={styles.main} edges={['top']}>
      {children}
    </SafeAreaView>
  )
}
