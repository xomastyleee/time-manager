import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { ScreenGap, ScreenView } from '@common/components'
import { useAppTheme, useCalculatedScreenGap } from '@common/hooks'

import type { AppTheme } from '@common/theme'
import { SettingsButton } from '../components'

const version = DeviceInfo.getVersion()
const buildNumber = DeviceInfo.getBuildNumber()

export const SettingsScreen = () => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)
  const { viewRef, gap, handleLayout } = useCalculatedScreenGap()

  return (
    <ScreenView>
      <View ref={viewRef} style={styles.main} onTouchStart={handleLayout}>
        <SettingsButton title="Profile" onPress={() => null} iconName="account" />
        <SettingsButton title="Appearance" onPress={() => null} iconName="palette" />
        <SettingsButton title="Language" onPress={() => null} iconName="translate" />
        <SettingsButton title="Memory" onPress={() => null} iconName="memory" />
        <SettingsButton title="About" onPress={() => null} iconName="information" />
        <Text style={styles.versionInfo}>
          Version: {version} ({buildNumber})
        </Text>
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
    },
    versionInfo: {
      color: theme.colors.text,
      marginVertical: 20,
      textAlign: 'center'
    }
  })
