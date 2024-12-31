import React from 'react'
import { StyleSheet, Text } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { ContentView, ScreenView } from '@common/components'
import { useAppTheme } from '@common/hooks'

import type { AppTheme } from '@common/theme'
import { SettingsButton } from '../components'

const version = DeviceInfo.getVersion()
const buildNumber = DeviceInfo.getBuildNumber()

export const SettingsScreen = () => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  return (
    <ScreenView>
      <ContentView style={styles.main}>
        <SettingsButton title="Profile" onPress={() => null} iconName="account" />
        <SettingsButton title="Appearance" onPress={() => null} iconName="palette" />
        <SettingsButton title="Language" onPress={() => null} iconName="translate" />
        <SettingsButton title="Memory" onPress={() => null} iconName="memory" />
        <SettingsButton title="About" onPress={() => null} iconName="information" />
        <Text style={styles.versionInfo}>
          Version: {version} ({buildNumber})
        </Text>
      </ContentView>
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
