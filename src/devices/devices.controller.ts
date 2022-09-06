import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { DevicesService } from './devices.service';
import { CreateDeviceDto } from './dtos/create-device.dto';
import { UpdateDeviceDto } from './dtos/update-device.dto';

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
