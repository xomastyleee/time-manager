import { taskService, userService } from '@common/services'
import { logger } from '@common/utils/logger-options'
import { getUserEntity } from '@common/services/transformers'
import { generateMockTask } from '@common/db/mockData/task.mock'
import { generateMockUser } from '@common/db/mockData/users.mock'

import { ITaskCreateUpdateParams, IUserCreateParams } from '../../types'

function getRandomElements<T>(arr: T[]): T[] {
  const count = Math.floor(Math.random() * (arr.length + 1))
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
export const getRandomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]
export const getRandomItems = <T>(items: T[], count: number): T[] =>
  [...items].sort(() => 0.5 - Math.random()).slice(0, count)

export async function createAllMockData() {
  logger.info('create all mock data')
  const tasks = await taskService.createTasks(generateMockTasks(15))
  const users = await userService.createUsers(generateMockUsers(3))

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

const generateMockTasks = (count: number): ITaskCreateUpdateParams[] => Array.from({ length: count }, generateMockTask)
const generateMockUsers = (count: number): IUserCreateParams[] => Array.from({ length: count }, generateMockUser)
