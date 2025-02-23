import { FC } from 'react'
import { View } from 'react-native'
import { Button, Card } from 'react-native-paper'
import Animated, { useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { useTimer } from 'react-timer-hook'
import { useStylesWithThemeAndDimensions } from '@common/hooks'

import { stylesWithTheme } from './timer.styles'

interface TimerProps {
  expiryTimestampOnTask: Date
  expiryTimestampOnPause: Date
  isTaskStarted: boolean
  isPauseTimer: boolean
  onStart: (newDuration: number) => void
  onPause: (newDuration: number) => void
  onStop: ({ duration, breakDuration }: { duration: number; breakDuration: number }) => void
}

export const Timer: FC<TimerProps> = ({
  expiryTimestampOnTask,
  expiryTimestampOnPause,
  isTaskStarted,
  isPauseTimer,
  onStart,
  onPause,
  onStop
}) => {
  const { styles } = useStylesWithThemeAndDimensions(stylesWithTheme)

  const taskTimer = useTimer({
    autoStart: false,
    expiryTimestamp: expiryTimestampOnTask,
    onExpire: () => {}
  })
  const pauseTimer = useTimer({
    autoStart: false,
    expiryTimestamp: expiryTimestampOnPause,
    onExpire: () => {}
  })

  const animatedText = useAnimatedStyle(() => ({
    opacity: withTiming(1, { duration: 500 })
  }))

  const startPauseButtonLabel = isPauseTimer ? 'Continue' : 'Start'

  const handleStartPause = () => {
    if (isTaskStarted) {
      taskTimer.pause()
      pauseTimer.start()
      onPause(pauseTimer.totalSeconds)
    } else {
      taskTimer.start()
      pauseTimer.pause()
      onStart(taskTimer.totalSeconds)
    }
  }

  const handleStop = () => {
    taskTimer.pause()
    pauseTimer.pause()
    onStop({ duration: taskTimer.totalSeconds, breakDuration: pauseTimer.totalSeconds })
  }

  return (
    <Card style={styles.container}>
      {isPauseTimer ? (
        <Animated.Text style={[styles.timerText, animatedText]}>
          {pauseTimer.hours}h {pauseTimer.minutes}m {pauseTimer.seconds}s
        </Animated.Text>
      ) : (
        <Animated.Text style={[styles.timerText, animatedText]}>
          {taskTimer.hours}h {taskTimer.minutes}m {taskTimer.seconds}s
        </Animated.Text>
      )}
      <View style={styles.buttonContainer}>
        <Button mode="contained" onPress={handleStartPause}>
          {isTaskStarted ? 'Pause' : startPauseButtonLabel}
        </Button>
        <Button mode="contained" onPress={handleStop}>
          Stop
        </Button>
      </View>
    </Card>
  )
}
