import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import { Device } from './device.entity';
import { CreateDeviceDto } from './dtos/create-device.dto';

@Injectable()
export class DevicesService {
    constructor(@InjectRepository(Device) private repo: Repository<Device>) {}

    create(deviceDto: CreateDeviceDto, user: User) {
        const device = this.repo.create(deviceDto);
        device.user = user;

        return this.repo.save(device);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id })
    }

    find() {
        return this.repo.findBy({ });
    }

    async update(id: number, attrs: Partial<Device>) {
        const device = await this.repo.findOneBy({ id });
        if(!device) {
            throw new NotFoundException('Device not found');
        }

        Object.assign(device, attrs);
        return this.repo.save(device);
    }

    async delete(id: number) {
        const device = await this.findOne(id);
        if(!device) {
            throw new NotFoundException('Device not found');
        }

        return this.repo.remove(device);
    }

    async changeApproval(id: string, approved: boolean) {
        const device = await this.repo.findOneBy({ id: parseInt(id) })
        if(!device) {
            throw new NotFoundException('Device not found');
        }

        device.approved = approved;
        return this.repo.save(device);
    }
}
