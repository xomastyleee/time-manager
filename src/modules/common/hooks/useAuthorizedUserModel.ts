import { useState, useEffect, useCallback, useMemo } from 'react'
import { IUserCreateUpdateParams, UserStatus } from '@common/types'
import { User } from '@common/db/entities'
import { userService } from '@common/services/user.service'
import { logger } from '@common/utils'

export const useAuthorizedUserModel = () => {
  const [user, setUser] = useState<User>()
  const [userList, setUserList] = useState<User[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const fetchUsers = useCallback(async () => {
    setIsLoading(true)

    const allUsers: User[] = await userService.getAllUsers()

    const activeUser = allUsers.find(({ status }) => status === UserStatus.Active)

    if (activeUser) {
      setUser(activeUser)
    }

    setUserList(allUsers)
    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchUsers()
  }, [fetchUsers])

  const registrationUser = useCallback(async (params: IUserCreateUpdateParams) => {
    setIsLoading(true)

    try {
      const newUser = await userService.createUser(params)
      const allUsers: User[] = await userService.getAllUsers()

      setUserList(allUsers)
      setUser(newUser)

      return newUser
    } catch (error) {
      logger.error('Failed to register user:', error)
      throw error
    } finally {
      setIsLoading(false)
    }
  }, [])

  const authorizeUser = useCallback(
    async (userId: number) => {
      if (!userId) return user

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
      } catch (error) {
        logger.error('Failed to authorize user:', error)
      }
      setIsLoading(false)
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
      } catch (error) {
        logger.error('Failed to log out:', error)
      }
      setIsLoading(false)
    }
  }, [user])

  return useMemo(
    () => ({
      user,
      userList,
      isLoading,
      registrationUser,
      authorizeUser,
      logout
    }),
    [user, userList, isLoading, authorizeUser, logout, registrationUser]
  )
}
