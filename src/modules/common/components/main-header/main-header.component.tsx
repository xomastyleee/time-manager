import React, { FC } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppTheme } from '@common/hooks'

import { stylesWithTheme } from './main-header.styles'
import type { MainHeaderProps } from '@modules/common/types'

export const MainHeader: FC<MainHeaderProps> = ({ options }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.main}>
        <View style={styles.labelWrapper}>
          <Text variant="titleLarge" style={styles.label}>
            {options.tabBarLabel}
          </Text>
        </View>
        <View style={styles.iconButtonWrapper}>
          <IconButton iconColor={theme.colors.background} icon="bell" size={20} />
        </View>
      </View>
    </SafeAreaView>
  )
}
