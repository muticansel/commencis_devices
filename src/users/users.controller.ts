import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Query,
    Delete,
    NotFoundException,
    Session,
    UseGuards,
    Res,
} from '@nestjs/common';
import { Serialize } from '../interceptors/serialize-interceptor';
import { CreateUserDto } from './dtos/create-user.dto';
import { UserDto } from './dtos/user.dto';
import { UsersService } from './users.service';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user-decorator';
import { User } from './user.entity';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
    constructor(
        private usersService: UsersService,
        private authService: AuthService,
    ) { };

    @Post('/signup')
    async createUser(@Body() body: CreateUserDto) {
        const user = await this.authService.signUp(body.email, body.password)
        return user;
    }

    @UseGuards(AuthGuard('local'))
    @Post('/signin')
    async signin(@Body() body: CreateUserDto, @Res() response: Response) {
        const loginResp = await this.authService.login(body);
        response.send({
            access_token: loginResp.access_token
        })
    }

    @Get('/whoami')
    whoAmI(@CurrentUser() user: User) {
        return user;
    }

    @Post('/signout')
    signOut(@Session() session: any) {
        session.userId = null;
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
