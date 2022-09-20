import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { UsersService } from './users.service';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) { }

    async signUp(email: string, password: string) {
        // Check if email is in use
        const users = await this.usersService.find(email);
        if (users.length) {
            throw new BadRequestException('Email in use');
        }

        // Generate a salt
        const salt = randomBytes(8).toString('hex');

        // Hash the salt and the pass together
        const hash = (await scrypt(password, salt, 32)) as Buffer;

        // Join the hashed result and the salt together
        const result = `${salt}.${hash.toString('hex')}`;

        // Create a new user and save it
        const user = await this.usersService.create(email, result);

        return user;
    }

    async signIn(email: string, password: string) {
        const [user] = await this.usersService.find(email);

        if (!user) {
            throw new NotFoundException('User not found')
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Wrong password')
        }
        return user;
    }

    async validateUser(email: string, pass: string): Promise<any> {
        const [user] = await this.usersService.find(email);
        if (user && this.validatePassword(pass, user)) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }

    async login(user: any) {
        const [_user] = await this.usersService.find(user.email)
        const payload = { email: _user.email, sub: _user.id };
        const access_token = await this.jwtService.sign(payload);
        return {
            access_token
        };
    }

    async validatePassword(password: string, user: any) {
        if (!user) {
            throw new NotFoundException('User not found')
        }

        const [salt, storedHash] = user.password.split('.');

        const hash = (await scrypt(password, salt, 32)) as Buffer;

        if (storedHash !== hash.toString('hex')) {
            throw new BadRequestException('Wrong password')
        }

        return true;
    }
}
