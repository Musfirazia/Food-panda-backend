import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
// import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }, 
    ])],
    controllers: [UserController],
    providers: [UserService],

})

export class UserModule  {

}
