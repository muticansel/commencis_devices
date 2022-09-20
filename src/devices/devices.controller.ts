import { Body, Controller, Delete, Get, Headers, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';
import { CurrentUser } from '../users/decorators/current-user-decorator';
import { User } from '../users/user.entity';
import { DeviceDto } from './dtos/device.dto';
import { Serialize } from '../interceptors/serialize-interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { ApproveDeviceDto } from './dtos/approve-device.dto';
import { JwtAuthGuard } from '../guards/jwt-auth-guard';
import { JwtService } from '@nestjs/jwt';

@Controller('devices')
export class DevicesController {
    constructor(
        private devicesService: DevicesService,
        private usersService: UsersService,
        private jwtService: JwtService
    ) { };

    @Post('/create')
    @UseGuards(JwtAuthGuard)
    @Serialize(DeviceDto)
    async createDevice(@Body() body: CreateDeviceDto, @Headers() headers) {
        const decodedJwt = this.jwtService.decode(headers.authorization.replace("Bearer ", ""));
        const user = await this.usersService.findOne(decodedJwt.sub);
        return this.devicesService.create(body, user);
    }

    @Get('/')
    @UseGuards(JwtAuthGuard)
    @Serialize(DeviceDto)
    findAllDevice() {
        return this.devicesService.find();
    }

    @Patch('/:id')
    @UseGuards(AdminGuard)
    @UseGuards(JwtAuthGuard)
    approveDevice(@Param('id') id: string, @Body() body: ApproveDeviceDto) {
        return this.devicesService.changeApproval(id, body.approved)
    }

    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    deleteDevice(@Param('id') id: string) {
        return this.devicesService.delete(parseInt(id))
    }
}
