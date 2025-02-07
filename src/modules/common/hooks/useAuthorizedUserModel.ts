import { useState, useEffect, useCallback, useMemo } from 'react'
import { IUserCreateUpdateParams, UserStatus } from '@common/types'
import { User } from '@common/db/entities'
import { userService } from '@common/services/user.service'
import { logger } from '@common/utils'

export const useAuthorizedUserModel = () => {
  const [user, setUser] = useState<User>()
  const [userList, setUserList] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)

    try {
      const allUsers: User[] = await userService.getAllUsers()

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

      const params: IUserCreateUpdateParams = {
        username,
        status: UserStatus.Active,
        preferences: '{}'
      }

      try {
        const newUser = await userService.createUser(params)
        const allUsers: User[] = await userService.getAllUsers()

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
