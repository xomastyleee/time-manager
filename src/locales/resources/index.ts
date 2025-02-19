import appNavigatorEn from './en/navigation/app-navigator.json'
import appNavigatorUk from './uk/navigation/app-navigator.json'
import authEn from './en/screens/auth.json'
import authUk from './uk/screens/auth.json'
import settingsEn from './en/screens/settings.json'
import settingsUk from './uk/screens/settings.json'
import profileEn from './en/screens/profile.json'
import profileUk from './uk/screens/profile.json'
import fallbackEn from './en/components/fallback-screen.json'
import fallbackUk from './uk/components/fallback-screen.json'
import tabBarEn from './en/components/tab-bar.json'
import tabBarUk from './uk/components/tab-bar.json'
import dailyHeaderEn from './en/components/daily-header.json'
import dailyHeaderUk from './uk/components/daily-header.json'
import dailyItemEn from './en/components/daily-item.json'
import dailyItemUk from './uk/components/daily-item.json'
import weeklyItemEn from './en/components/weekly-item.json'
import weeklyItemUk from './uk/components/weekly-item.json'
import itemPickerEn from './en/components/item-picker.json'
import itemPickerUK from './uk/components/item-picker.json'

export const resources = {
  en: {
    navigation: {
      appNavigator: appNavigatorEn
    },
    screens: {
      auth: authEn,
      settings: settingsEn,
      profile: profileEn
    },
    components: {
      fallbackScreen: fallbackEn,
      tabBar: tabBarEn,
      dailyHeader: dailyHeaderEn,
      dailyItem: dailyItemEn,
      weeklyItem: weeklyItemEn,
      itemPicker: itemPickerEn
    }
  },
  uk: {
    navigation: {
      appNavigator: appNavigatorUk
    },
    screens: {
      auth: authUk,
      settings: settingsUk,
      profile: profileUk
    },
    components: {
      fallbackScreen: fallbackUk,
      tabBar: tabBarUk,
      dailyHeader: dailyHeaderUk,
      dailyItem: dailyItemUk,
      weeklyItem: weeklyItemUk,
      itemPicker: itemPickerUK
    }
  }
}
