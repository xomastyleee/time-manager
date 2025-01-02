import React, { FC, ReactNode } from 'react'
import { useAppTheme } from '@common/hooks'

import { stylesWithTheme } from './fallback-screen.styles'
import { MainBackgroundView } from '../main-background-view'

interface FallbackScreenProps {
  error?: boolean
  isLoading?: boolean
  children?: ReactNode
}

export const FallbackScreen: FC<FallbackScreenProps> = ({ error, isLoading, children }) => {
  const theme = useAppTheme()
  const styles = stylesWithTheme(theme)

  if (error) {
    return <MainBackgroundView />
  }

  if (isLoading) {
    return <MainBackgroundView />
  }

  return <>{children}</>
}
