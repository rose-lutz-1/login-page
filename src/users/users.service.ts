/* service file for the user entity. defines all methods for the user. 
 */

import { HttpException, HttpStatus, Injectable , NotFoundException, NotImplementedException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { Not, Repository } from 'typeorm';
import { error } from 'console';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
      ) {}


      // finds all users in the repository
    findAll() {
        const user = this.userRepository.find();
        return user;
    }

    // finds the user with the id number searched
    async findOne(id: string){
       const user = this.userRepository.findOne(id);
        if(!user){
            throw new NotFoundException(`User #${id} not found`)
        }
        return user;
    }

    //finds the user with the email searched
    async findByEmail(email: string){
        const user = await this.userRepository.findOne({email});
        console.log(email);
        if(!user){
            throw new NotFoundException(`${email} not found`)
        }
        return user;
        
    }

    //creates a new user given the dto, saves the user, deletes, the password, and then returns the user. 
    async create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        await user.save()
        delete user.password;
        return user;

    }


    //removes the user associated with the email entered. 
    async remove(email: string){
        const user = await this.findByEmail(email);
        return this.userRepository.remove(user);
    } 

    //this method checks if an email is already in use. it uses the findOne method to search for the email in the dto.
    //If it finds the email (length > 0) it returns true, otherwise it returns false.
    async doesUserExist(createUserDTO: CreateUserDto) {
        const user = await this.userRepository.findOne({ email: createUserDTO.email });
        if(user  !== undefined){
            return true;
        }
        return false;
    }

    //checks to see if the ID of an account is being used. If it is not found, it will return false
    // otherwise it will return true
    async isUsed(id: string) {
        const num = await this.userRepository.findOne(':id');
        console.log(num);
        if ( num !== undefined) {
            console.log('true')
            return true;
        }
        else{
             console.log('else');
             return false;
        }
    }
}
