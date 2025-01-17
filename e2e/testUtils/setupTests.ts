import { device } from 'detox'

beforeAll(async () => {
  await device.launchApp({ newInstance: true })
})

afterAll(async () => {
  await device.terminateApp()
})
