import { Injectable , NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';



@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    findAll() {
        return this.userRepository.find();
    }

    async findOne(id: string){
        const user = await this.userRepository.findOne(id);
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return user;
    }

    create(createUserDto: any) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);

    }

    async update(id: string, UpdateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({
            id: + id,
            ...UpdateUserDto,
        });
        if (!user) {
            throw new NotFoundException(`User #${id} not found`);
        }
        return this.userRepository.save(user);
    }

    async remove(id: string){
        const user = await this.findOne(id);
        return this.userRepository.remove(user);
    } 
}
