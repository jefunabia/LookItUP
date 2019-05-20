import { UserStatus } from "@app/enums/user-status.enum";

export interface UserTokenModel {
    id?: String,
    userId: String,
    status?: UserStatus,
}
