import React, { ReactElement, FC, PropsWithChildren, createContext, useContext } from 'react'
import { useAuthorizedUserModel } from '@common/hooks'

export interface ProtectedContentProps extends PropsWithChildren {
  fallback: ReactElement
  loadingComponent?: ReactElement
}

const AuthContext = createContext<ReturnType<typeof useAuthorizedUserModel> | undefined>(undefined)

export const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
  const auth = useAuthorizedUserModel()
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>
}

export const ProtectedContent: FC<ProtectedContentProps> = ({ children, fallback, loadingComponent }) => {
  const authContext = useContext(AuthContext)

  if (authContext?.isLoading && loadingComponent) {
    return loadingComponent
  }

  if (authContext?.user) {
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
