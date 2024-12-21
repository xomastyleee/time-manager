import React from 'react'
import { StyleSheet, View } from 'react-native'
import { ScreenGap, ScreenView } from '@common/components'
import { useAppTheme, useCalculatedScreenGap } from '@common/hooks'

import type { AppTheme } from '@common/theme'

export const SettingsScreen = () => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)
  const { viewRef, gap, handleLayout } = useCalculatedScreenGap()

  return (
    <ScreenView>
      <View ref={viewRef} style={styles.main} onTouchStart={handleLayout}>
        <ScreenGap height={gap} />
      </View>
    </ScreenView>
  )
}

const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    main: {
      backgroundColor: theme.colors.screenContent,
      borderRadius: '5%',
      marginHorizontal: '3%',
      padding: '3%'
    }
  })
