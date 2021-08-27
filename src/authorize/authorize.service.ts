import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/users/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthorizeDto } from './dto/authorize.dto';

@Injectable()
export class AuthorizeService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) {}

    //when a user logs in and is validated, they will get an access token. 
    async login(authorizeDto: AuthorizeDto) {
        console.log('1')
        const user = await this.validateUser(authorizeDto);
        console.log('2')
        const payload = { 

            userId: user.id ,
        };
        console.log('payload' + payload);
        return {
            access_token: this.jwtService.sign(payload) ,
        };
        
    }

    //Method to validate the user. If their password and email match, they are authorized, otherwise
    // it will throw an unauthorized exception.
    async validateUser(authorizeDto: AuthorizeDto): Promise<User> {
        const { email, password } = authorizeDto;
        console.log('1')
        const user = await this.usersService.findByEmail(email);
        console.log('2')
        if(!(await user?.validatePassword(password))) {
            throw new UnauthorizedException();
        }
        console.log('3')
        return user;

    }
}
