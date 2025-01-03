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
    lightBlue: '#c7d7e4',
    primary: '#38707f',
    primaryBackground: '#38707f',
    secondary: '#de8573',
    white: '#ffffff',
    lightBeige: '#eac5ab',
    background: '#f0f0f0',
    screenContent: 'rgba(255, 255, 255, 0.6)'
  }
})

export const darkTheme = populateTheme(MD3DarkTheme, {
  colors: {
    transparent: 'transparent',
    lightBlue: '#384b5a',
    primary: '#38707f',
    primaryBackground: '#233033',
    secondary: '#21a78c',
    text: '#ffffff',
    white: '#000000',
    lightBeige: '#153a54',
    background: '#1a1a1a',
    screenContent: 'rgba(0, 0, 0, 0.6)'
  }
})

export type DarkAndLightTheme = typeof lightTheme | typeof darkTheme

export type AppTheme = DarkAndLightTheme & MD3Theme
