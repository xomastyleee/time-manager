import React, { FC, ReactElement, ReactNode } from 'react'
import { View } from 'react-native'
import { useStylesWithTheme } from '@common/hooks'

import { stylesWithTheme } from './main-background-view.styles'

interface MainBackgroundViewProps {
  children?: ReactElement | ReactNode
}

export const MainBackgroundView: FC<MainBackgroundViewProps> = ({ children }) => {
  const { styles } = useStylesWithTheme(stylesWithTheme)

  return <View style={styles.main}>{children}</View>
}
