import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
// import {JwtService} from '@nestjs/jwt';
import { jwtConstants } from './constants';


const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
    constructor(@InjectModel('User') private readonly userModel: Model<User>) {
        //  jwtService: JwtService

    }
    // private sanitizeUser(user: User) {
    //     return user.depopulate('password');
    // }

    async insertUser(name: string, email: string, password: string,number:string, admin?: boolean) {
        const uniqueUser = await this.findUser(email);
        if (!uniqueUser) {
            // console.log(uniqueUser,"unique");

          const bcrypt = require('bcrypt');
          console.log('password -->', password)
          const hashedPassword = await bcrypt.hash(password, 10);
          console.log("hashed password -->", hashedPassword)
          password = hashedPassword;
          const newUser = new this.userModel({ name, email, password, number,admin});
  
          const result = await newUser.save();
          return { success: true }
        }
        else {
            throw { statusCode: 400, message: 'User already exist' };
          }
  
    }
    private async findUser(email: string): Promise<User> {
        let user;
        try {
          user = await this.userModel.findOne({ email: email }).exec();
          return user;
        } catch (error) {
          throw error;
        }
      }
    // async login(email: string, password: string) {

    //     const bcrypt = require('bcrypt');
    //     try {
    //         const user = await this.userModel.findOne({ email: email })

    //         if (!user)
    //             return {
    //                 loginSuccess: false,
    //                 message: "Auth failed, email not found"
    //             }
    //         else {
    //             console.log('password -->', password)
    //             const isPasswordMatching = await bcrypt.compare(
    //                 password,
    //                 user.password,
    //             );
    //             console.log(password, user.password)

    //             if (!isPasswordMatching) {
    //                 throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //             }

    //             const userdata = { ...user }
    //             const token = jwt.sign(userdata, jwtConstants.secret)
    //             user.token = token;
    //             console.log(token);
    //             await user.save();
    //             user.password = undefined;

    //             return { user: user, success: true };

    //         }

    //     }
    //     catch (error) {
    //         console.log(error)
    //         throw new HttpException('Wrong credentials provided', HttpStatus.BAD_REQUEST);
    //     }

    // }
    async logout(id: string) {

        await this.userModel.findOneAndUpdate({ _id: id }, { token: "" })


    }
}



