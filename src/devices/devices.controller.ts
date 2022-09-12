import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';
import { DeviceDto } from './dtos/device.dto';
import { Serialize } from '../interceptors/serialize-interceptor';
import { AuthGuard } from '../guards/auth.guard';

@Controller('devices')
export class DevicesController {
    constructor(private devicesService: DevicesService) {};

    @Post('/')
    @UseGuards(AuthGuard)
    @Serialize(DeviceDto)
    createDevice(@Body() body: CreateDeviceDto, @CurrentUser() user: User) {
        return this.devicesService.create(body, user);
    }

    @Get('/')
    findAllDevice() {
        return this.devicesService.find();
    }

    @Patch('/:id')
    updateDevice(@Param('id') id: string, @Body() body: UpdateDeviceDto) {
        const updatedDevice = {
            possessionDate: new Date(body.possessionDate),
            name: body.name
        }
        return this.devicesService.update(parseInt(id), updatedDevice)
    }

    @Delete('/:id')
    deleteDevice(@Param('id') id: string) {
        return this.devicesService.delete(parseInt(id))
    }
}
