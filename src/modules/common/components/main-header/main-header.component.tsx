import React, { FC } from 'react'
import { View } from 'react-native'
import { IconButton, Text } from 'react-native-paper'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useStylesWithTheme } from '@common/hooks'

import { stylesWithTheme } from './main-header.styles'
import type { MainHeaderProps } from '@modules/common/types'

export const MainHeader: FC<MainHeaderProps> = ({ options }) => {
  const { styles, colors } = useStylesWithTheme(stylesWithTheme)

  return (
    <SafeAreaView edges={['top']}>
      <View style={styles.main}>
        <View style={styles.labelWrapper}>
          <Text variant="titleLarge" style={styles.label}>
            {options.tabBarLabel}
          </Text>
        </View>
        <View style={styles.iconButtonWrapper}>
          <IconButton iconColor={colors.onBackground} icon="bell" size={20} />
        </View>
      </View>
    </SafeAreaView>
  )
}
