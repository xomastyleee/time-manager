import { useState, useEffect, useCallback, useMemo } from 'react'
// todo: delete this type
import { UserState, UserStatus } from '@common/types'
import { User } from '@common/db/entities'
import { userService } from '@common/services/user.service'

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

  /**
   * todo: update function
   * If the user state have user with same userId we should't do anything
   * If the user state have user with different userId we should update user state with new user and set status for old user to Inactive
   * User with new userId should be added to userList if it doesn't exist
   */
  const authorizeUser = (userId: number) => {}

  const logout = () => {}

  return useMemo(
    () => ({
      user,
      userList,
      isLoading,
      authorizeUser,
      logout
    }),
    [isLoading, user, userList]
  )
}
