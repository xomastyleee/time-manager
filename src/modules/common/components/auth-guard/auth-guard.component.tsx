import React, { ReactElement, FC, PropsWithChildren, createContext, useContext } from 'react'
import { useAuthorizedUserModel } from '@common/hooks'

export interface ProtectedContentProps extends PropsWithChildren {
  fallback: ReactElement
  loadingComponent?: ReactElement
}

export const defaultAuthorizedUserModel = {
  user: undefined,
  userList: [],
  isLoading: false,
  error: null,
  registerUser: async () => undefined,
  authorizeUser: async () => undefined,
  logout: async () => {}
}

export const AuthContext = createContext<ReturnType<typeof useAuthorizedUserModel>>(defaultAuthorizedUserModel)

export const useAuth = () => useContext(AuthContext)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuthorizedUserModel()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

// @ts-expect-error - 'R'
export const ProtectedContent: FC<ProtectedContentProps> = ({ children, fallback, loadingComponent }) => {
  const { isLoading, user } = useAuth()

  if (isLoading && loadingComponent) {
    return loadingComponent
  }

  if (user) {
    return children
  }

  return fallback
}

export const AuthGuard: FC<ProtectedContentProps> = ({ children, loadingComponent, fallback }) => (
  <AuthProvider>
    <ProtectedContent loadingComponent={loadingComponent} fallback={fallback}>
      {children}
    </ProtectedContent>
  </AuthProvider>
)
