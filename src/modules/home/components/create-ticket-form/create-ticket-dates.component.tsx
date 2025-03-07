import React, { type RefObject, useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View, Keyboard } from 'react-native'
import { Control, UseFormWatch, useController } from 'react-hook-form'
import { Text, Chip } from 'react-native-paper'
import dayjs from 'dayjs'
import { Calendar, CalendarProvider } from 'react-native-calendars'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@modules/common/hooks'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import type { ITaskCreateParams } from '@common/types'

interface CreateTicketDatesProps {
  control: Control<ITaskCreateParams>
  watch: UseFormWatch<ITaskCreateParams>
  scrollRef: RefObject<ScrollView>
}

interface ICalendarDay {
  year: number
  month: number
  day: number
  timestamp: number
  dateString: string
}

interface ICalendarMarkedDates {
  [key: string]: { selected: boolean }
}

const minDate = dayjs().format('YYYY-MM-DD')

export const CreateTicketDates = ({ control, watch, scrollRef }: CreateTicketDatesProps) => {
  const { styles, colors } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const [markedDates, setMarkedDates] = useState<ICalendarMarkedDates>({})

  const { field } = useController({
    control,
    name: 'dates'
  })

  const title = watch('title')
  const description = watch('description')

  const datesAnim = useSharedValue(0)

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: datesAnim.value,
      width: '100%'
    }),
    [datesAnim]
  )

  const onDayPress = ({ dateString }: ICalendarDay) => {
    setMarkedDates((prev) => {
      const newMarkedDates = prev

      if (newMarkedDates[dateString]) {
        delete newMarkedDates[dateString]
      } else {
        newMarkedDates[dateString] = { selected: true }
      }

      const selectedDates = Object.keys(newMarkedDates).map((date) => dayjs(date).toDate())
      field.onChange(selectedDates)

      return newMarkedDates
    })
  }

  useEffect(() => {
    if (title && description) {
      datesAnim.value = withTiming(1, { duration: 300 })
    } else {
      datesAnim.value = withTiming(0, { duration: 300 })
    }
  }, [datesAnim, title, description])

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      if (title && description) {
        scrollRef.current?.scrollTo({ y: 200, animated: true })
      }
    })

    return () => {
      keyboardDidHideListener.remove()
    }
  }, [title, description, scrollRef])

  return (
    <Animated.View style={[animatedStyle, styles.container]}>
      <CalendarProvider date={minDate}>
        <Calendar
          minDate={minDate}
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            selectedDayBackgroundColor: colors.primary,
            selectedDayTextColor: colors.onPrimary,
            todayTextColor: colors.primary,
            dayTextColor: colors.onBackground,
            monthTextColor: colors.onBackground
          }}
        />
        <View style={styles.selectedDatesContainer}>
          <Text style={styles.selectedDatesTitle}>Selected dates:</Text>
          <View style={styles.chipContainer}>
            {Object.keys(markedDates).map((dateString) => (
              <Chip key={dateString} style={styles.chip} onPress={() => onDayPress({ dateString } as ICalendarDay)}>
                {dayjs(dateString).format('DD.MM.YYYY')}
              </Chip>
            ))}
          </View>
        </View>
      </CalendarProvider>
    </Animated.View>
  )
}

const stylesWithTheme = ({ theme: { colors } }: CreateStylesProps) =>
  StyleSheet.create({
    chip: {
      backgroundColor: colors.surfaceVariant
    },
    chipContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 8
    },
    container: {
      marginTop: 16
    },
    dateButton: {
      alignItems: 'center',
      backgroundColor: colors.surfaceVariant,
      borderRadius: 8,
      padding: 12
    },
    datePickerContainer: {
      gap: 12
    },
    selectedDatesContainer: {
      marginTop: 16
    },
    selectedDatesTitle: {
      fontSize: 16,
      fontWeight: '500',
      marginBottom: 8
    }
  })
