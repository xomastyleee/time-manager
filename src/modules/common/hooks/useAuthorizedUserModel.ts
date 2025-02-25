import { useState, useEffect, useCallback, useMemo } from 'react'
import { IUser, IUserCreateParams, UserStatus } from '@common/types'
import { userService } from '@common/services/user.service'
import { logger } from '@common/utils'
import { BASE_TYPE_PREFERENCES } from '@common/constants'

export const useAuthorizedUserModel = () => {
  const [user, setUser] = useState<IUser>()
  const [userList, setUserList] = useState<IUser[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)

    try {
      const allUsers: IUser[] = await userService.getAllUsers()

      const activeUser = allUsers.find(({ status }) => status === UserStatus.Active)

      if (activeUser) {
        setUser(activeUser)
      }

      setUserList(allUsers)
    } catch (e) {
      logger.error('Failed to get all users list:', e)
      setError(String(e))
    } finally {
      setIsLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const registerUser = useCallback(
    async (username: string) => {
      setIsLoading(true)

      const params: IUserCreateParams = {
        preferences: BASE_TYPE_PREFERENCES,
        username,
        status: UserStatus.Active,
        tasks: []
      }

      try {
        const newUser = await userService.createUser(params)
        const allUsers: IUser[] = await userService.getAllUsers()

        setUserList(allUsers)
        setUser(newUser)

        return newUser
      } catch (e) {
        logger.error('Failed to register user:', e)
        setError(error)
      } finally {
        setIsLoading(false)
      }
    },
    [error]
  )

  const authorizeUser = useCallback(
    async (userId: number) => {
      if (user && userId === user.id) {
        return user
      }

      try {
        setIsLoading(true)
        if (user) {
          await userService.updateUser(user.id, { status: UserStatus.Inactive })
        }

        const selectedUser = userList.find(({ id }) => id === userId)
        if (selectedUser) {
          await userService.updateUser(selectedUser.id, { status: UserStatus.Active })
          setUser(selectedUser)
          return selectedUser
        }
      } catch (e) {
        logger.error('Failed to authorize user:', e)
        setError(String(e))
      } finally {
        setIsLoading(false)
      }
      return user
    },
    [user, userList]
  )

  const logout = useCallback(async () => {
    if (user) {
      setIsLoading(true)
      try {
        await userService.updateUser(user.id, { status: UserStatus.Inactive })
        setUser(undefined)
      } catch (e) {
        logger.error('Failed to log out:', error)
        setError(String(e))
      }
      setIsLoading(false)
    }
  }, [user, error])

  return useMemo(
    () => ({
      user,
      userList,
      isLoading,
      error,
      registerUser,
      authorizeUser,
      logout
    }),
    [user, userList, isLoading, error, authorizeUser, logout, registerUser]
  )
}
