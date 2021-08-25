import { Controller , Body, Get, Delete,Param, Post, Query, Patch} from '@nestjs/common';
import { create } from 'domain';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService)  {}

    @Get()
    findAll(@Query() Pagination) {
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.usersService.findOne('' + id);
    }


    @Post()
    create(@Body() createUserDto: CreateUserDto){
        return this.usersService.create(CreateUserDto);

    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() UpdateUserDto){
        return this.usersService.update(id, UpdateUserDto);

    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

}