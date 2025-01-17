import React, { FC } from 'react'
import { type ViewProps } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useStylesWithTheme } from '@common/hooks'

import { stylesWithTheme } from './screen-view.styles'

interface ScreenViewProps extends ViewProps, React.PropsWithChildren<object> {}

export const ScreenView: FC<ScreenViewProps> = (props) => {
  const { styles } = useStylesWithTheme(stylesWithTheme)

  return (
    <ScrollView {...props} style={styles.main}>
      {props.children}
    </ScrollView>
  )
}
