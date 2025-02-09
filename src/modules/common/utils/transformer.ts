import { type TransformFnParams } from 'class-transformer'
import { UserStatus } from '@common/types'

export function enumToStrings(enumValue: object): string[] {
  return Object.keys(enumValue)
    .filter((key) => Number.isNaN(Number(key)))
    .map((item) => `"${item}"`)
}

export const UserStatusTransformer = ({ value }: TransformFnParams): UserStatus =>
  Object.values(UserStatus).includes(value as UserStatus) ? (value as UserStatus) : UserStatus.Inactive
