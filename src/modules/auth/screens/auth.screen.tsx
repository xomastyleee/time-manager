import React, { FC, useEffect, useState } from 'react'
import {
  StyleSheet,
  useWindowDimensions,
  View,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  Pressable,
  type TextStyle,
  type ViewStyle,
  KeyboardAvoidingView
} from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { Button, Modal, Portal, Text, TextInput } from 'react-native-paper'
import { useTranslation } from 'react-i18next'
import { useUser } from '@common/components'
import { useAppTheme } from '@common/hooks'
import { AppTheme } from '@modules/common/theme'
import { isIos } from '@common/constants'

import type { IUser } from '@common/types'

interface UserListItemProps {
  user: IUser
  textStyle: TextStyle
  userListItemStyle: ViewStyle
  authorizeUser: (userId: number) => Promise<IUser | undefined>
}

const UserListItem: FC<UserListItemProps> = ({ user, textStyle, userListItemStyle, authorizeUser }) => (
  <Pressable onPress={() => authorizeUser(user.id)} style={userListItemStyle}>
    <Text style={textStyle}>{user.username}</Text>
  </Pressable>
)

export const AuthScreen = () => {
  const theme = useAppTheme()
  const styles = makeStyles(theme)
  const { height } = useWindowDimensions()
  const { t } = useTranslation('screens')
  const authContainerHeight = height * 0.4

  const [userName, setUserName] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isUserListModalOpen, setIsUserListModalOpen] = useState(false)

  const { userList, registerUser, authorizeUser } = useUser()

  const authContainerTranslate = useSharedValue(0)

  const animationAuthContainerStyles = useAnimatedStyle(
    () => ({
      transform: [{ translateY: withTiming(authContainerHeight - authContainerTranslate.value) }]
    }),
    [authContainerTranslate]
  )

  const handleRegisterUser = () => {
    if (userName) {
      registerUser(userName)
      setUserName('')
    }
  }

  useEffect(() => {
    authContainerTranslate.value = authContainerHeight
  }, [authContainerHeight, authContainerTranslate])

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} testID="start-up">
      <View style={styles.container}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={isIos ? 'position' : undefined}>
          <Animated.View style={[styles.authContainer, animationAuthContainerStyles, { height: authContainerHeight }]}>
            <View>
              <Text variant="bodyLarge" style={styles.title}>
                {t('auth.title')}
              </Text>
              <TextInput
                mode="outlined"
                value={userName}
                onChangeText={setUserName}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                label={isFocused ? t('auth.name.label') : t('auth.name.placeholder')}
              />
            </View>
            {userList.length > 0 && (
              <>
                <Text variant="bodyLarge" style={styles.title}>
                  {t('auth.or')}
                </Text>
                <Button onPress={() => setIsUserListModalOpen(true)}>{t('auth.selectProfile')}</Button>
                <Portal>
                  <Modal
                    visible={isUserListModalOpen}
                    contentContainerStyle={styles.modalContainer}
                    onDismiss={() => setIsUserListModalOpen(false)}
                  >
                    <FlatList
                      data={userList}
                      renderItem={({ item }) => (
                        <UserListItem
                          user={item}
                          textStyle={styles.title}
                          userListItemStyle={styles.userListItem}
                          authorizeUser={authorizeUser}
                        />
                      )}
                      keyExtractor={({ id }) => `user-${id}`}
                    />
                  </Modal>
                </Portal>
              </>
            )}
            <Button
              buttonColor={theme.colors.primary}
              disabled={!userName}
              mode="contained"
              onPress={handleRegisterUser}
            >
              {t('auth.authorize')}
            </Button>
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </TouchableWithoutFeedback>
  )
}

const makeStyles = (theme: AppTheme) =>
  StyleSheet.create({
    authButton: {},
    authContainer: {
      backgroundColor: theme.colors.background,
      borderTopLeftRadius: 50,
      borderTopRightRadius: 50,
      justifyContent: 'space-between',
      padding: 40,
      width: '100%'
    },
    container: {
      alignItems: 'center',
      flex: 1,
      justifyContent: 'flex-end',
      width: '100%'
    },
    keyboardAvoidingView: {
      width: '100%'
    },
    modalContainer: {
      backgroundColor: theme.colors.background,
      borderRadius: 20,
      justifyContent: 'center',
      margin: 20,
      maxHeight: 400,
      minHeight: 200,
      padding: 20
    },
    title: {
      color: theme.colors.primary,
      textAlign: 'center'
    },
    userListItem: {
      borderBottomWidth: 1,
      padding: 10,
      width: '100%'
    }
  })
