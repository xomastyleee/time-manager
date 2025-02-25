import { ITaskCreateParams } from '@common/types'
import { faker } from '@faker-js/faker'

export const generateMockTask = (): ITaskCreateParams => ({
  title: faker.lorem.sentence(),
  type: 'temporary',
  dates: [faker.date.future(), faker.date.future()],
  description: faker.lorem.paragraph(),
  duration: faker.number.int({ min: 1800000, max: 14400000 }), // От 30 мин до 4 часов
  breakDuration: faker.number.int({ min: 300000, max: 1800000 }), // От 5 до 30 мин
  user: undefined
})

export const TASK_MOCK: ITaskCreateParams[] = [
  {
    title: 'Complete project documentation',
    type: 'temporary',
    dates: [new Date('2025-02-17'), new Date('2025-02-19')],
    description: 'Write detailed documentation for the project',
    duration: 7200000, // 2 hours
    breakDuration: 900000, // 15 minutes
    user: undefined
  }
]
