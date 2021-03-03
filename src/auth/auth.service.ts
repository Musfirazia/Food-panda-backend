/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Injectable } from '@nestjs/common';
import jwt = require('jsonwebtoken');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async signin(req) {
    try {
      const userExist = await this.userModel.findOne({ email: req.body.email });
      if (!userExist) {
        throw {
          statusCode: 404,
          message: 'User with this email does not exist',
        };
      }
      const token = jwt.sign(
        { email: req.body.email },
        process.env.SECRET_KEY,
        {
          expiresIn: '5d',
        },
      );
      if (!token) {
        throw { statusCode: 400, message: 'token not generated!' };
      }
      return token;
    } catch (error) {
      console.log("error in sigin catch",error)
      throw error;
    }
  }
}
