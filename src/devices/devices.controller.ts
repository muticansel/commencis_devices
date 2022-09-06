import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';

@Controller('devices')
export class DevicesController {
    constructor(private devicesService: DevicesService) {};

    @Post('/')
    createDevice(@Body() body: CreateDeviceDto) {
        this.devicesService.create(body.name, new Date(body.possessionDate));
    }

    @Get('/')
    findAllDevice() {
        return this.devicesService.find();
    }

    @Delete('/:id')
    deleteDevice(@Param('id') id: string) {
        return this.devicesService.delete(parseInt(id))
    }
}
