import React, { FC, ReactElement, ReactNode } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useAppTheme } from '@common/hooks'

import { stylesWithTheme } from './screen-view.styles'

interface ScreenViewProps {
  children?: ReactElement | ReactNode
}

export const ScreenView: FC<ScreenViewProps> = ({ children }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  return <ScrollView style={styles.main}>{children}</ScrollView>
}
