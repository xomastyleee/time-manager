import { userService } from '@common/services/user.service'
import { USERS_MOCK } from '@common/db/mockData'

export async function createAllMockData() {
  await userService.createUsers(USERS_MOCK)
}
