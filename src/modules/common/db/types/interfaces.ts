import { UserStatus } from '@common/db/types/enams'

export interface IUserCreateUpdateParams {
  status: UserStatus
  username?: string
  preferences?: string
}
