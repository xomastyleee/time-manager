import { getLocales } from 'react-native-localize'
import { userService } from '@modules/common/services/user.service'

import { initI18n } from '../index'

export const detectAndInitAppLanguage = async () => {
  try {
    const user = await userService.getActiveUser()
    const systemLanguage = getLocales()[0].languageCode

    if (!user) {
      return await initI18n(systemLanguage)
    }

    const { id, preferences = {} } = user
    const storedLanguage = preferences.lang
    const selectedLanguage = preferences.useSystemLang ? systemLanguage : storedLanguage || systemLanguage

    if (!storedLanguage) {
      await userService.updateUser(id, { preferences: { ...preferences, lang: selectedLanguage } })
    }

    await initI18n(selectedLanguage)
  } catch (error) {
    await initI18n('en')
  }
}
