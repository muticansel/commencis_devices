import { Controller, Post, Body, Get, Session, Param, Query, Delete, NotFoundException, UseInterceptors } from '@nestjs/common';
import { Serialize } from '../interceptors/serialize-interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) { };

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto, @Session() session: any) {
        const user = await this.authService.signUp(body.email, body.password)
        session.userId = user.id;
        return user;
    }

    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Session() session: any) {
        const { email, password } = body;
        const user = await this.authService.signIn(email, password);
        session.userId = user.id;
        return user;
    }

    @Get('/:id')
    async findUser(@Param('id') id: string) {
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('User not found');
        }
        return user;
    }

    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id: string) {
        return this.usersService.remove(parseInt(id));
    }

}
