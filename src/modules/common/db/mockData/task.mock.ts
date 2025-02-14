import { DayWeek, ITaskCreateUpdateParams, Priority, TaskStatus, TaskType } from '@common/types'
import { faker } from '@faker-js/faker'
import { getRandomItem, getRandomItems } from '@common/db/mockData/createMockData'

export const generateMockTask = (): ITaskCreateUpdateParams => ({
  title: faker.lorem.sentence(),
  priority: getRandomItem(Object.values(Priority)),
  type: getRandomItem(Object.values(TaskType)),
  weekly: getRandomItems(Object.values(DayWeek), faker.number.int({ min: 1, max: 3 })) as DayWeek[],
  dates: [faker.date.future(), faker.date.future()],
  status: getRandomItem(Object.values(TaskStatus)),
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 1800000, max: 14400000 }), // От 30 мин до 4 часов
  breakDuration: faker.number.int({ min: 300000, max: 1800000 }) // От 5 до 30 мин
})
