import { Expose, Transform } from "class-transformer";
import { User } from "../../users/user.entity";

export class DeviceDto {
    @Expose()
    name: string;
    @Expose()
    possessionDate: Date;

    @Transform(({ obj }) => obj.user.id)
    @Expose()
    userId: string;
}