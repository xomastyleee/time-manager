import { UserStatus } from '@common/db/types/enams'

export interface IUserCreateUpdateParams {
  username?: string
  preferences?: string
  status: UserStatus
}
