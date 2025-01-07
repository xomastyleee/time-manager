import { MD3LightTheme, MD3DarkTheme, MD3Theme, MD3Elevation } from 'react-native-paper'

type CustomColors = Partial<Record<keyof MD3Theme['colors'], string>> & Record<string, string>
type CustomFonts = Partial<MD3Theme['fonts']> & Record<string, MD3Theme['fonts'][keyof MD3Theme['fonts']]>
type CustomAnimation = Partial<MD3Theme['animation']> &
  Record<string, MD3Theme['animation'][keyof MD3Theme['animation']]>

interface CustomTheme {
  colors?: CustomColors
  fonts?: CustomFonts
  roundness?: number
  animation?: CustomAnimation
}

const populateTheme = (theme: MD3Theme, config: CustomTheme): MD3Theme & CustomTheme => ({
  ...theme,
  ...config,
  colors: {
    ...theme?.colors,
    ...config.colors,
    elevation: theme?.colors?.elevation as MD3Elevation & string
  },
  fonts: {
    ...theme?.fonts,
    ...config.fonts
  },
  roundness: config.roundness ?? theme?.roundness,
  animation: {
    ...theme?.animation,
    ...config.animation
  }
})

export const lightTheme = populateTheme(MD3LightTheme, {
  colors: {
    transparent: 'transparent',
    lightBlue: 'rgb(199, 215, 228)',
    primary: 'rgb(56, 112, 127)',
    primaryBackground: 'rgb(56, 112, 127)',
    secondary: 'rgb(222, 133, 115)',
    white: 'rgb(255, 255, 255)',
    lightBeige: 'rgb(234, 197, 171)',
    background: 'rgb(240, 240, 240)',
    screenContent: 'rgba(255, 255, 255, 0.6)'
  }
})

export const darkTheme = populateTheme(MD3DarkTheme, {
  colors: {
    transparent: 'transparent',
    lightBlue: 'rgb(56, 75, 90)',
    primary: 'rgb(56, 112, 127)',
    primaryBackground: 'rgb(35, 48, 51)',
    secondary: 'rgb(33, 167, 140)',
    text: 'rgb(255, 255, 255)',
    white: 'rgb(0, 0, 0)',
    lightBeige: 'rgb(21, 58, 84)',
    background: 'rgb(26, 26, 26)',
    screenContent: 'rgba(0, 0, 0, 0.6)'
  }
})

export type DarkAndLightTheme = typeof lightTheme | typeof darkTheme

export type AppTheme = DarkAndLightTheme & MD3Theme
