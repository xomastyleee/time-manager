import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native'
import { TextInput, Text, IconButton, Chip, Icon } from 'react-native-paper'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useForm, Controller, SubmitHandler } from 'react-hook-form'
import dayjs from 'dayjs'
import { type HomeStackParamList, useTypedNavigation } from '@navigation/navigation-options'
import { ItemPicker, ScreenView, useUser } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions, useUserTaskModel } from '@common/hooks'
import { taskService } from '@common/services'
import { DayWeekMap, Priority, TaskType } from '@common/types/enums'
import { DailyMode, DATE_FORMAT_DAY, dayNames, INIT_DATE_FORMAT } from '@common/constants'

import type { ITask, ITaskCreateUpdateParams, ITasksByWeeks, WeekDayCodes } from '@common/types'

type PriorityArray = Array<{ value: Priority; labelColor?: string }>

export const CreateTaskScreen = () => {
  const { styles, colors } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { user } = useUser()

  const { navigate } = useTypedNavigation<HomeStackParamList>()

  const priorityAnim = useSharedValue(0)

  const [currentDate, setCurrentDate] = useState(dayjs())
  const [dailyMode, setDailyMode] = useState(DailyMode.DAY)
  const [priorityArray, setPriorityArray] = useState<PriorityArray>(
    Object.values(Priority).map((priority) => ({ value: priority, labelColor: colors.primary }))
  )
  const [isThisPriorityTakenError] = useState(false)

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    setValue
  } = useForm<ITaskCreateUpdateParams>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      type: TaskType.Work,
      duration: 72000000, // 2 hours
      breakDuration: 900000, // 15 minutes
      weekly: [],
      dates: []
    }
  })

  const title = watch('title')
  const selectedPriority = watch('priority')
  const weekly = watch('weekly')
  const dates = watch('dates')

  const createTaskCallback = useCallback(
    (props: { tasks?: ITask[]; tasksByWeeks?: ITasksByWeeks }) => {
      const updatedPriorityArray = priorityArray.map((priority) => {
        let isPriorityTaken = false
        if (props.tasks) {
          isPriorityTaken = props.tasks.some(
            (task) =>
              task.priority === priority.value &&
              (task.dates?.some((date) => dates?.some((d) => dayjs(d).isSame(date, 'day'))) ||
                task.weekly?.some((w) => weekly?.includes(w)))
          )
        }
        if (props.tasksByWeeks) {
          isPriorityTaken = Object.entries(props.tasksByWeeks).some(
            ([day, tasks]) =>
              weekly?.includes(Number(day)) &&
              tasks.some(
                (task) =>
                  task.priority === priority.value &&
                  (task.dates?.some((date) => dates?.some((d) => dayjs(d).isSame(date, 'day'))) ||
                    task.weekly?.some((w) => weekly.includes(w)))
              )
          )
        }
        return {
          ...priority,
          labelColor: isPriorityTaken ? colors.gray : colors.primary
        }
      })
      setPriorityArray(updatedPriorityArray)
    },
    [priorityArray, colors, dates, weekly]
  )

  useUserTaskModel({ dailyMode, currentDate, createTaskCallback })

  const animatedStyle = useAnimatedStyle(
    () => ({
      opacity: priorityAnim.value,
      width: '100%'
    }),
    [priorityAnim]
  )

  const titleErrorStyle = { opacity: errors.title ? 1 : 0 }
  const descriptionErrorStyle = { opacity: errors.description ? 1 : 0 }
  const priorityErrorStyle = { opacity: isThisPriorityTakenError ? 1 : 0 }

  const handlePreviousPress = useCallback(() => {
    const newDate = currentDate.subtract(1, 'day')

    setCurrentDate(newDate)
  }, [currentDate])

  const handleNextPress = useCallback(() => {
    const newDate = currentDate.add(1, 'day')

    setCurrentDate(newDate)
  }, [currentDate])

  const updateDates = () => {
    const newDate = new Date(currentDate.format(INIT_DATE_FORMAT))
    if (!dates?.some((date) => dayjs(date).isSame(newDate, 'day'))) {
      const newDates = [...(dates || []), newDate]
      setValue('dates', newDates)
      setDailyMode(DailyMode.DAY)
    }
  }

  const handleWeeklyPress = (day: WeekDayCodes) => {
    if (weekly?.includes(day)) {
      setValue(
        'weekly',
        weekly?.filter((d) => d !== day)
      )
    } else {
      setValue('weekly', [...(weekly || []), day])
    }
    setDailyMode(DailyMode.WEEK)
  }

  const onSubmit: SubmitHandler<ITaskCreateUpdateParams> = async (data) => {
    if (!user) return
    if (weekly && weekly.length === 0 && dates && dates.length === 0) return

    try {
      await taskService.createTask({ ...data, user })
      navigate('HomeScreen')
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  }

  useEffect(() => {
    if (title) {
      priorityAnim.value = withTiming(1, { duration: 300 })
    } else {
      priorityAnim.value = withTiming(0, { duration: 300 })
    }
  }, [priorityAnim, title])

  // useEffect(() => {
  //   const selectedPriorityItem = priorityArray.find((item) => item.value === selectedPriority)
  //   if (selectedPriorityItem?.labelColor === colors.gray) {
  //     setIsThisPriorityTakenError(true)
  //   } else {
  //     setIsThisPriorityTakenError(false)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedPriority, priorityArray])

  return (
    <ScreenView>
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.formContainer}>
            <Controller
              control={control}
              name="title"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Title"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />
            <Text style={[styles.inputError, titleErrorStyle]}>This is required.</Text>
            <Controller
              control={control}
              name="description"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  placeholder="Description"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  style={styles.input}
                />
              )}
            />
            <Text style={[styles.inputError, descriptionErrorStyle]}>This is required.</Text>
            <Animated.View style={animatedStyle}>
              <Text style={styles.title}>Select weekly days:</Text>
              <View style={styles.datesContainer}>
                {Object.values(DayWeekMap).map((day) => (
                  <TouchableOpacity key={`${day}`} onPress={() => handleWeeklyPress(day as WeekDayCodes)}>
                    <Chip selected={weekly?.includes(day)} style={styles.chip}>
                      <Text>{dayNames[day]}</Text>
                    </Chip>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.title}>Select specific dates:</Text>
              <View style={styles.dateContainer}>
                <IconButton icon="arrow-left-drop-circle-outline" size={24} onPress={handlePreviousPress} />
                <Text>{currentDate.format(DATE_FORMAT_DAY)}</Text>
                <IconButton icon="arrow-right-drop-circle-outline" size={24} onPress={handleNextPress} />
              </View>
              <View style={styles.datesContainer}>
                {dates?.map((date) => (
                  <TouchableOpacity
                    key={`${date}`}
                    onPress={() => {
                      setValue(
                        'dates',
                        dates?.filter((d) => d !== date)
                      )
                      setDailyMode(DailyMode.DAY)
                    }}
                  >
                    <Chip style={styles.chip}>
                      <Text>{dayjs(date).format(DATE_FORMAT_DAY)}</Text>
                      <Icon color={colors.primary} source="close" size={14} />
                    </Chip>
                  </TouchableOpacity>
                ))}
              </View>
              <IconButton style={styles.button} icon="plus-circle" size={34} onPress={updateDates} />
              <Text style={styles.title}>Select Priority:</Text>
              <Controller
                control={control}
                name="priority"
                rules={{ required: true }}
                render={({ field: { onChange, value } }) => (
                  <ItemPicker selectedValue={value} onValueChange={onChange} items={priorityArray} />
                )}
              />
              <Text style={[styles.inputError, priorityErrorStyle]}>
                Selected Priority: {selectedPriority} has been taken
              </Text>
            </Animated.View>
          </View>
        </TouchableWithoutFeedback>
        {!isThisPriorityTakenError && isValid && (
          <IconButton
            style={styles.button}
            icon="plus-circle"
            size={34}
            iconColor={colors.primary}
            onPress={handleSubmit(onSubmit)}
            disabled={!isValid}
          />
        )}
      </View>
    </ScreenView>
  )
}

const stylesWithTheme = ({ theme: { colors } }: CreateStylesProps) =>
  StyleSheet.create({
    button: {
      alignSelf: 'center'
    },
    chip: {
      margin: 8
    },
    container: {
      padding: 16
    },
    dateContainer: {
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.onScreenContent,
      borderRadius: 20,
      flexDirection: 'row',
      height: 30,
      justifyContent: 'space-between',
      width: 200
    },
    datesContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
      marginVertical: 8,
      width: '100%'
    },
    formContainer: {
      alignItems: 'center',
      flex: 1
    },
    input: {
      height: 40,
      marginVertical: 12,
      paddingLeft: 8,
      width: '100%'
    },
    inputError: {
      color: colors.error
    },
    title: {
      textAlign: 'left',
      width: '100%'
    }
  })
