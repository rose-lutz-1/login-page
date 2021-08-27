//handles requests and returns responses.
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwtauthorize.guard';
import { AuthorizeService } from './authorize.service';
import { AuthorizeDto } from './dto/authorize.dto';

@Controller('authorize')
export class AuthorizeController {
  constructor(private readonly authorizeService: AuthorizeService) {}


  //Post logs in a user using their entered username and password.
  @Post()
  login(@Body() authorizeDto: AuthorizeDto) {
    console.log(authorizeDto.email, authorizeDto.password);
    const token = this.authorizeService.login(authorizeDto);
    console.log(token);
    return token;
  }




//tells you if you are authorized
  @UseGuards(JwtAuthGuard)
  @Get()
  async admit() {
    return 'Authorized!';
  }
}

