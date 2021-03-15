/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Body, Injectable } from '@nestjs/common';
import jwt = require('jsonwebtoken');
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../user/user.model';
import {Seller} from "../foodSeller/foodSeller.model";
import {Admin} from "../admin/admin.model";
@Injectable()
export class AuthService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>,@InjectModel('Seller') private readonly sellerModel: Model<Seller>,@InjectModel('Admin') private readonly adminModel: Model<Admin>) {}
//sign in as a user
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
        { id: userExist._id },
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

//sign in as a food seller
  async signInAsSeller(req) {
    try {
      const userExist = await this.sellerModel.findOne({ email: req.body.email });
      if (!userExist) {
        throw {
          statusCode: 404,
          message: 'User with this email does not exist',
        };
      }
      const token = jwt.sign(
        { id: userExist._id },
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
  async signInAsAdmin(req) {
    try {
      const userExist = await this.adminModel.findOne({ email: req.body.email });
      if (!userExist) {
        throw {
          statusCode: 404,
          message: 'User with this email does not exist',
        };
      }
      const token = jwt.sign(
        { id: userExist._id },
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
