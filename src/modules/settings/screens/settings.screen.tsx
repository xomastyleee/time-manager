import React from 'react'
import { StyleSheet, Text } from 'react-native'
import DeviceInfo from 'react-native-device-info'
import { useTranslation } from 'react-i18next'
import { ContentView, ScreenView } from '@common/components'
import { useAppTheme } from '@common/hooks'
import { useTypedNavigation, SettingsStackParamList } from '@navigation/navigation-options'

import type { AppTheme } from '@common/theme'
import { SettingsButton } from '../components'

const version = DeviceInfo.getVersion()
const buildNumber = DeviceInfo.getBuildNumber()

export const SettingsScreen = () => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)
  const { t } = useTranslation('screens')

  const { navigate } = useTypedNavigation<SettingsStackParamList>()

  const navigateToSettings = () => {
    navigate('ProfileScreen')
  }

  return (
    <ScreenView>
      <ContentView>
        <SettingsButton title={t('settings.profile')} onPress={navigateToSettings} iconName="account" />
        <SettingsButton title={t('settings.appearance')} onPress={() => null} iconName="palette" />
        <SettingsButton title={t('settings.language')} onPress={() => null} iconName="translate" />
        <SettingsButton title={t('settings.memory')} onPress={() => null} iconName="memory" />
        <SettingsButton title={t('settings.about')} onPress={() => null} iconName="information" />
        <Text style={styles.versionInfo}>
          {t('settings.version')}: {version} ({buildNumber})
        </Text>
      </ContentView>
    </ScreenView>
  )
}

const stylesWithTheme = (theme: AppTheme) =>
  StyleSheet.create({
    versionInfo: {
      color: theme.colors.text,
      marginVertical: 20,
      textAlign: 'center'
    }
  })
