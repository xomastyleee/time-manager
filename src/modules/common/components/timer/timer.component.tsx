import { FC } from 'react'
import { View, Pressable } from 'react-native'
import { Button } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { useStylesWithThemeAndDimensions } from '@common/hooks'

import { stylesWithTheme } from './timer.styles'

interface TimerProps {
  time: string
  isRunning: boolean
  onStartPause: () => void
  onReset: () => void
}

export const Timer: FC<TimerProps> = ({ time, isRunning, onStartPause, onReset }) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  return (
    <View style={styles.container}>
      <Animated.Text style={styles.timerText}>{time}</Animated.Text>
      <View style={styles.buttonContainer}>
        <Pressable onPress={onStartPause}>
          <Animated.View style={styles.animatedButton}>
            <Button mode="contained" onPress={onStartPause}>
              {isRunning ? 'Pause' : 'Start'}
            </Button>
          </Animated.View>
        </Pressable>
        <Button mode="contained" onPress={onReset} style={styles.resetButton}>
          Reset
        </Button>
      </View>
    </View>
  )
}
