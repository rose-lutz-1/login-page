/* this page handles the incoming requests and returns responses to the client
*/

import { Controller , Body, Get, Delete,Param, Post, Query, Patch} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService} from './users.service';


@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService)  {}


    //Get with no parameters searches for all of the users in the array and returns them.
    @Get()
    findAll(@Query() any ) {
        const users = this.usersService.findAll();
        return users;
    }

    //Get with the "id" parameter finds the account matching that id and returns it.
    @Get(':id')
    findOne(@Param('id') id: number){
        if (this.usersService.isUsed('id')){
            return this.usersService.findOne('' + id);
        }
    }

    //Post creates a new user based on the clients inputs. If the email already exists,
    //it will return an error. If not, it will create the account.  
    @Post()
    async create(@Body() createUserDto: CreateUserDto){
        if( await this.usersService.doesUserExist(createUserDto)){
            return "Email is already in use."
        }
        return this.usersService.create(createUserDto);

    }

    //Delete will remove the account with the id entered. If the id is not being used,
    //it will return an error. 
    @Delete(':id')
    async remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }

}