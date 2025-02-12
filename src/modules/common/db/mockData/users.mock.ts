import { IUserCreateParams, UserStatus } from '@common/types'

export const USERS_MOCK: IUserCreateParams[] = [
  {
    username: 'User1',
    preferences: {
      theme: 'light',
      backgroundPath: null,
      isDark: false,
      lang: 'en',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User2',
    preferences: {
      theme: 'dark',
      backgroundPath: null,
      isDark: true,
      lang: 'fr',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User3',
    preferences: {
      theme: 'dark',
      backgroundPath: null,
      isDark: false,
      lang: 'es',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  }
]
