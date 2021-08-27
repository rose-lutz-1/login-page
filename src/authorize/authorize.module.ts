import { Module } from '@nestjs/common';
import { AuthorizeService } from './authorize.service';
import { AuthorizeController } from './authorize.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule, PassportModule,
  JwtModule.registerAsync({
    imports: [ConfigModule],
    useFactory: async () => ({ 
      secret: process.env.JWT_SECRET,
    }),
    inject: [ConfigService],
  }),
],
  controllers: [AuthorizeController],
  providers: [AuthorizeService,  JwtStrategy]
})
export class AuthorizeModule {}
