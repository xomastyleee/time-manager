import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export const formatDuration = (seconds?: number) => {
  if (!seconds) {
    return ''
  }
  const time = dayjs.duration(seconds, 'ms')
  const hours = time.hours()
  const minutes = time.minutes()
  const secs = time.seconds()

  const formattedParts = []
  if (hours) formattedParts.push(`${hours} hr`)
  if (minutes) formattedParts.push(`${minutes} min`)
  if (secs || (!hours && !minutes)) formattedParts.push(`${secs} sec`)

  return formattedParts.join(' ')
}
