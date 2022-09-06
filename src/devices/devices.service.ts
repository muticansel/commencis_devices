import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Device } from './device.entity';

@Injectable()
export class DevicesService {
    constructor(@InjectRepository(Device) private repo: Repository<Device>) {}

    create(name: string, possessionDate: Date) {
        const user = this.repo.create({ name, possessionDate });

        return this.repo.save(user);
    }

    findOne(id: number) {
        return this.repo.findOneBy({ id })
    }

    find() {
        return this.repo.findBy({ });
    }

    async delete(id: number) {
        console.log("IDDDD: ", id)
        const device = await this.findOne(id);
        if(!device) {
            throw new Error('Device not found');
        }

        return this.repo.remove(device);
    }
}
