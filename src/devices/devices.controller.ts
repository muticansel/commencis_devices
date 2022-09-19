import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';
import { DeviceDto } from './dtos/device.dto';
import { Serialize } from '../interceptors/serialize-interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { AdminGuard } from '../guards/admin.guard';
import { ApproveDeviceDto } from './dtos/approve-device.dto';

@Controller('devices')
export class DevicesController {
    constructor(private devicesService: DevicesService) {};

    @Post('/')
    @Serialize(DeviceDto)
    createDevice(@Body() body: CreateDeviceDto, @CurrentUser() user: User) {
        return this.devicesService.create(body, user);
    }

    @Get('/')
    @Serialize(DeviceDto)
    findAllDevice() {
        return this.devicesService.find();
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    approveDevice(@Param('id') id: string, @Body() body: ApproveDeviceDto) {
        return this.devicesService.changeApproval(id, body.approved)
    }

    @Delete('/:id')
    deleteDevice(@Param('id') id: string) {
        return this.devicesService.delete(parseInt(id))
    }
}
