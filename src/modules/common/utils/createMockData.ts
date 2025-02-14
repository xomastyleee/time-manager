import { USERS_MOCK } from '@common/db/mockData'
import { taskService, userService } from '@common/services'
import { logger } from '@common/utils/logger-options'
import { getUserEntity } from '@common/services/transformers'
import { faker } from '@faker-js/faker'

import { DayWeek, ITaskCreateUpdateParams, Priority, TaskStatus, TaskType } from '../types'

function getRandomElements<T>(arr: T[]): T[] {
  const count = Math.floor(Math.random() * (arr.length + 1))
  const shuffled = [...arr].sort(() => Math.random() - 0.5)
  return shuffled.slice(0, count)
}
const getRandomItem = <T>(items: T[]): T => items[Math.floor(Math.random() * items.length)]
const getRandomItems = <T>(items: T[], count: number): T[] => [...items].sort(() => 0.5 - Math.random()).slice(0, count)

export async function createAllMockData() {
  logger.info('create all mock data')
  const tasks = await taskService.createTasks(generateMockTasks(15))
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

const generateMockTask = (): ITaskCreateUpdateParams => ({
  title: faker.lorem.sentence(),
  priority: getRandomItem(Object.values(Priority)),
  type: getRandomItem(Object.values(TaskType)),
  weekly: getRandomItems(Object.values(DayWeek), faker.number.int({ min: 1, max: 3 })),
  dates: [faker.date.future(), faker.date.future()],
  status: getRandomItem(Object.values(TaskStatus)),
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 1800000, max: 14400000 }), // От 30 мин до 4 часов
  breakDuration: faker.number.int({ min: 300000, max: 1800000 }) // От 5 до 30 мин
})
export const generateMockTasks = (count: number): ITaskCreateUpdateParams[] =>
  Array.from({ length: count }, generateMockTask)
