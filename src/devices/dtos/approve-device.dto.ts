import { IsBoolean } from "class-validator";

export class ApproveDeviceDto {
    @IsBoolean()
    approved: boolean;
}