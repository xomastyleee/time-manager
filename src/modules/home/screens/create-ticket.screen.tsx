import React from 'react'
import { StyleSheet } from 'react-native'
import { ContentView, ScreenView } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@common/hooks'

export const CreateTicketScreen = () => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <ScreenView>
      <ContentView style={styles.main} />
    </ScreenView>
  )
}

const stylesWithTheme = ({ dimensions: { height } }: CreateStylesProps) =>
  StyleSheet.create({
    main: {}
  })
