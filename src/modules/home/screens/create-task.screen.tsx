import React, { useRef } from 'react'
import {
  StyleSheet,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Platform
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { IconButton } from 'react-native-paper'
import { useForm, SubmitHandler } from 'react-hook-form'
import { type HomeStackParamList, useTypedNavigation } from '@navigation/navigation-options'
import { useUser } from '@common/components'
import { type CreateStylesProps, useStylesWithThemeAndDimensions } from '@common/hooks'
import { taskService } from '@common/services'

import type { ITaskCreateParams } from '@common/types'
import { CreateTicketTitleDesc, CreateTicketDates } from '../components'

export const CreateTaskScreen = () => {
  const { styles, colors } = useStylesWithThemeAndDimensions(stylesWithTheme)
  const { user } = useUser()

  const scrollRef = useRef<ScrollView>(null)

  const { navigate } = useTypedNavigation<HomeStackParamList>()

  const {
    control,
    handleSubmit,
    watch,
    formState: { isValid }
  } = useForm<ITaskCreateParams>({
    mode: 'onChange',
    defaultValues: {
      title: '',
      description: '',
      duration: 0,
      breakDuration: 0,
      dates: []
    }
  })

  const onSubmit: SubmitHandler<ITaskCreateParams> = async (data) => {
    if (!user) return

    try {
      // await taskService.createTask({ ...data, user })
      // navigate('HomeScreen')
    } catch (error) {
      // Handle error (e.g., show an error message)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        enabled
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <ScrollView
              ref={scrollRef}
              style={styles.flex}
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled
            >
              <View style={styles.formContainer}>
                <View>
                  <CreateTicketTitleDesc control={control} name="title" placeholder="Title" />
                  <CreateTicketTitleDesc control={control} name="description" placeholder="Description" />
                  <CreateTicketDates control={control} watch={watch} scrollRef={scrollRef} />
                </View>
                {isValid && (
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
            </ScrollView>
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const stylesWithTheme = (_: CreateStylesProps) =>
  StyleSheet.create({
    button: {
      alignSelf: 'center'
    },
    container: {
      flex: 1,
      padding: 16
    },
    flex: {
      flex: 1
    },
    formContainer: {
      flex: 1,
      justifyContent: 'space-between',
      width: '100%'
    },
    keyboardAvoidingView: {
      flex: 1,
      width: '100%'
    },
    safeArea: {
      flex: 1
    },
    scrollContent: {
      flexGrow: 1,
      paddingBottom: 20
    }
  })
