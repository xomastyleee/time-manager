import {UserStatus} from "@db/types/enams";

export interface IUserCreateUpdateParams {
    username?: string,
    preferences?: string,
    status: UserStatus,
}