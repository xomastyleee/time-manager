import { StyleSheet } from 'react-native'
import { Control, Controller } from 'react-hook-form'
import { TextInput } from 'react-native-paper'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@modules/common/hooks'

import type { ITaskCreateParams } from '@common/types'

interface CreateTicketTitleDescProps {
  control: Control<ITaskCreateParams, unknown>
  name: 'title' | 'description'
  placeholder: string
}

export const CreateTicketTitleDesc = ({ control, name, placeholder }: CreateTicketTitleDescProps) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: true }}
      render={({ field: { onChange, onBlur, value } }) => (
        <TextInput
          placeholder={placeholder}
          mode="outlined"
          onBlur={onBlur}
          onChangeText={onChange}
          value={value}
          style={styles.input}
        />
      )}
    />
  )
}
const stylesWithTheme = (_: CreateStylesProps) =>
  StyleSheet.create({
    input: {
      height: 40,
      marginVertical: 12,
      paddingLeft: 8,
      width: '100%'
    }
  })
