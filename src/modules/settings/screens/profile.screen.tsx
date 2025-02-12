import React from 'react'
import { StyleSheet } from 'react-native'
import { ContentView, ScreenView, useUser } from '@common/components'
import { useAppTheme } from '@common/hooks'

import type { AppTheme } from '@common/theme'
import { SettingsButton } from '../components'

export const ProfileScreen = () => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  const { logout } = useUser()

  return (
    <ScreenView>
      <ContentView style={styles.main}>
        <SettingsButton title="Logout" onPress={logout} iconName="account-off" />
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
    }
  })
