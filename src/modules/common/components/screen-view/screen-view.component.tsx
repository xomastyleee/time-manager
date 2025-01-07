import React, { FC, ReactElement, ReactNode } from 'react'
import { ScrollView } from 'react-native-gesture-handler'
import { useStylesWithTheme } from '@common/hooks'

import { stylesWithTheme } from './screen-view.styles'

interface ScreenViewProps {
  children?: ReactElement | ReactNode
}

export const ScreenView: FC<ScreenViewProps> = ({ children }) => {
  const { styles } = useStylesWithTheme(stylesWithTheme)

  return <ScrollView style={styles.main}>{children}</ScrollView>
}
