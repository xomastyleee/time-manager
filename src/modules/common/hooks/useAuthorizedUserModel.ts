import { useState, useEffect } from 'react'
import { UserState, UserStatus } from '@common/types'
import { User } from '@common/db/entities'
import { userService } from '@common/services/user.service'

export const useAuthorizedUserModel = () => {
  const [state, setState] = useState<UserState>({
    user: null,
    userList: [],
    isLoading: true
  })

  useEffect(() => {
    const fetchUsers = async () => {
      const mockUsers: User[] = await userService.getAllUsers()

      setState((prevState) => ({
        ...prevState,
        userList: mockUsers,
        isLoading: false
      }))
    }

    fetchUsers()
  }, [])

  const authorizeUser = (userId: number) => {
    setState((prevState) => {
      if (prevState.user) {
        return prevState
      }

      const updatedUserList = prevState.userList.map((user) =>
        user.id === userId ? { ...user, status: UserStatus.Active } : user
      )

      const authorizedUser = updatedUserList.find((user) => user.id === userId) || null

      return {
        ...prevState,
        user: authorizedUser,
        userList: updatedUserList
      }
    })
  }

  return {
    user: state.user,
    userList: state.userList,
    isLoading: state.isLoading,
    authorizeUser
  }
}
