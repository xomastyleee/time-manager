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
  },
  {
    username: 'User4',
    preferences: {
      theme: 'dark',
      backgroundPath: null,
      isDark: true,
      lang: 'de',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User5',
    preferences: {
      theme: 'light',
      backgroundPath: null,
      isDark: false,
      lang: 'it',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User6',
    preferences: {
      theme: 'light',
      backgroundPath: null,
      isDark: true,
      lang: 'ru',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User7',
    preferences: {
      theme: 'light',
      backgroundPath: null,
      isDark: false,
      lang: 'pt',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User8',
    preferences: {
      theme: 'orange',
      backgroundPath: null,
      isDark: true,
      lang: 'nl',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User9',
    preferences: {
      theme: 'cyan',
      backgroundPath: null,
      isDark: false,
      lang: 'zh',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  },
  {
    username: 'User10',
    preferences: {
      theme: 'pink',
      backgroundPath: null,
      isDark: true,
      lang: 'ja',
      useSystemLang: true
    },
    status: UserStatus.Inactive
  }
]
