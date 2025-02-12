import { type TransformFnParams } from 'class-transformer'
import { Priority, TaskType, UserStatus } from '@common/types'

export const UserStatusTransformer = ({ value }: TransformFnParams): UserStatus =>
  Object.values(UserStatus).includes(value as UserStatus) ? (value as UserStatus) : UserStatus.Inactive

export const PriorityTransformer = ({ value }: { value: string }) =>
  Object.values(Priority).includes(value as Priority) ? (value as Priority) : Priority.C

export const TaskTypeTransformer = ({ value }: { value: string }) =>
  Object.values(TaskType).includes(value as TaskType) ? (value as TaskType) : TaskType.Work
