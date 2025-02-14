import { IUserCreateParams, UserStatus } from '@common/types'
import { faker } from '@faker-js/faker'
import { getRandomItem } from '@common/db/mockData/createMockData'

export const generateMockUser = (): IUserCreateParams => ({
  username: faker.person.bio(),
  preferences: {
    theme: getRandomItem(['light', 'dark']),
    backgroundPath: null,
    isDark: faker.datatype.boolean(),
    lang: getRandomItem(['en', 'de', 'ar']),
    useSystemLang: faker.datatype.boolean()
  },
  status: UserStatus.Inactive
})
