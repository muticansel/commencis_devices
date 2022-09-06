import { IsString, IsOptional } from "class-validator";

export class UpdateDeviceDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    possessionDate: string;
}