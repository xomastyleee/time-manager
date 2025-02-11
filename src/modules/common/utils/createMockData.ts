import { TASK_MOCK, USERS_MOCK } from '@common/db/mockData'
import { taskService, userService } from '@common/services'

export async function createAllMockData() {
  await userService.createUsers(USERS_MOCK)
  await taskService.createTasks(TASK_MOCK)
}
