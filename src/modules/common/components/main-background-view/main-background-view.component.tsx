import React, { FC, ReactElement, ReactNode } from 'react'
import { View } from 'react-native'
import { useAppTheme } from '@common/hooks'

import { stylesWithTheme } from './main-background-view.styles'

interface MainBackgroundViewProps {
  children?: ReactElement | ReactNode
}

export const MainBackgroundView: FC<MainBackgroundViewProps> = ({ children }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  return <View style={styles.main}>{children}</View>
}
