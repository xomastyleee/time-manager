import { TASK_MOCK, USERS_MOCK } from '@common/db/mockData'
import { taskService, userService } from '@common/services'
import { logger } from '@common/utils/logger-options'
import { getUserEntity } from '@common/services/transformers'

function getRandomElements<T>(arr: T[]): T[] {
  const count = Math.floor(Math.random() * (arr.length + 1))
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}

export async function createAllMockData() {
  const tasks = await taskService.createTasks(TASK_MOCK)
  const users = await userService.createUsers(USERS_MOCK)

  if (users && tasks) {
    const promises = users.map(async (user) => {
      const randomTasks = getRandomElements(tasks)
      const userEntity = getUserEntity(user)
      userEntity.tasks = randomTasks
      return userService.saveUser(userEntity)
    })

    await Promise.all(promises)
    logger.info(`Created ${users.length} USERS`)
  }
}
