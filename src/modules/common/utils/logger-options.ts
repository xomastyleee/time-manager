import { logger as l, configLoggerType, transportFunctionType, consoleTransport } from 'react-native-logs'

type CustomTransportOptions = {
  showTimestamp?: boolean
  showSeverity?: boolean
  colors?: {
    info?: string
    warn?: string
    error?: string
  }
}

export const loggerOptions: configLoggerType<
  transportFunctionType<CustomTransportOptions>,
  'debug' | 'info' | 'warn' | 'error'
> = {
  transport: consoleTransport as transportFunctionType<CustomTransportOptions>,
  severity: 'debug',
  levels: {
    debug: 0,
    info: 1,
    warn: 2,
    error: 3
  },
  transportOptions: {
    showTimestamp: true,
    showSeverity: true,
    colors: {
      info: 'blueBright',
      warn: 'yellowBright',
      error: 'redBright'
    }
  },
  async: true,
  dateFormat: 'time',
  printLevel: true,
  printDate: true,
  fixedExtLvlLength: false,
  enabled: true
}

interface PublicLogger {
  debug: (...args: unknown[]) => void
  info: (...args: unknown[]) => void
  warn: (...args: unknown[]) => void
  error: (...args: unknown[]) => void
  enable: (extension?: string) => boolean
  disable: (extension?: string) => boolean
  setSeverity: (level: string) => string
  getSeverity: () => string
}

export const logger: PublicLogger = l.createLogger(loggerOptions)
