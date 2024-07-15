import { Body, Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {
        return req.user;
    }

    @UseGuards(AuthGuard('jwt'))
    @Put(':id')
    editUser(@Param('id') userId: string, @Body() dto: EditUserDto) {
        // console.log(req.user);
        const parseduserId = parseInt(userId, 10);
        return this.userService.editUser(parseduserId, dto);
    }
}
