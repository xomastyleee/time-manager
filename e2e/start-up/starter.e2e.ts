import { by, element, expect } from 'detox'

describe('Start-up', () => {
  it('the application must be running', async () => {
    await expect(element(by.id('start-up'))).toBeVisible()
  })
})
