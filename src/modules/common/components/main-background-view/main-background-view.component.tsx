import React, { FC, PropsWithChildren } from 'react'
import { View } from 'react-native'
import { useStylesWithThemeAndDimensions } from '@common/hooks'

import { stylesWithTheme } from './main-background-view.styles'

export const MainBackgroundView: FC<PropsWithChildren> = ({ children }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return <View style={styles.main}>{children}</View>
}
