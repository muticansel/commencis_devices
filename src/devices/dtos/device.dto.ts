import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class DeviceDto {
    @Expose()
    name: string;
    @Expose()
    possessionDate: Date;
    @Expose()
    approved: boolean;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: string;
}