import React, { FC, useState } from 'react'
import { TouchableOpacity, View } from 'react-native'
import { Chip, Icon, Text } from 'react-native-paper'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useStylesWithThemeAndDimensions } from '@common/hooks'
import { useTranslation } from 'react-i18next'
import { Priority } from '@common/types'

import { stylesWithTheme } from './item-picker.styles'

interface ItemPickerProps {
  items: Array<{ value: Priority; labelColor?: string }>
  selectedValue?: string
  onValueChange: (value: string) => void
}

export const ItemPicker: FC<ItemPickerProps> = ({ selectedValue, onValueChange, items }) => {
  const { styles, colors } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { t } = useTranslation('components')
  const [showOptions, setShowOptions] = useState(false)
  const fadeAnim = useSharedValue(0)

  const toggleOptions = () => {
    setShowOptions(!showOptions)
    fadeAnim.value = withTiming(showOptions ? 0 : 1, { duration: 300 })
  }

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: fadeAnim.value
    }),
    [fadeAnim]
  )

  return (
    <View>
      <TouchableOpacity onPress={toggleOptions} style={styles.picker}>
        <Text style={styles.title}>{selectedValue || t('itemPicker.selectOption')}</Text>
      </TouchableOpacity>
      {showOptions && (
        <Animated.View style={[styles.pickerOptions, animatedStyle]}>
          {items.map((item) => (
            <TouchableOpacity
              key={item.value}
              onPress={() => {
                onValueChange(item.value)
                toggleOptions()
              }}
              style={styles.pickerOption}
            >
              <Chip disabled={item.labelColor === colors.gray} icon={`alpha-${item.value.toLowerCase()}`}>
                <Icon color={item.labelColor ?? colors.primary} source="plus" size={14} />
              </Chip>
            </TouchableOpacity>
          ))}
        </Animated.View>
      )}
    </View>
  )
}
