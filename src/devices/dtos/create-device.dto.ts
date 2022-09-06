import { IsDate, IsString } from 'class-validator';

export class CreateDeviceDto {
    @IsString()
    name: string;

    @IsString()
    possessionDate: string;
}