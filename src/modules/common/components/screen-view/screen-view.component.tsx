import React, { FC } from 'react'
import { type ViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useStylesWithThemeAndDimensions } from '@common/hooks'

import { stylesWithTheme } from './screen-view.styles'

interface ScreenViewProps extends ViewProps, React.PropsWithChildren<object> {}

export const ScreenView: FC<ScreenViewProps> = (props) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <ScrollView {...props} style={styles.main} nestedScrollEnabled>
      {props.children}
    </ScrollView>
  )
}
