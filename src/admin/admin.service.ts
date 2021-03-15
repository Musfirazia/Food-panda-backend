import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Admin } from './admin.model';
import { Rider } from "../rider/rider.model";
import {Seller} from "../foodSeller/foodSeller.model";
const jwt = require('jsonwebtoken');

@Injectable()
export class AdminService {
  constructor(@InjectModel('Admin') private readonly adminModel: Model<Admin>,
    @InjectModel('Rider') private readonly riderModel: Model<Rider>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>) {
    //  jwtService: JwtService

  }

  async insertAdmin(name: string, email: string, password: string, number: string, admin?: boolean) {
    const uniqueAdmin = await this.findAdmin(email);
    if (!uniqueAdmin) {
      const bcrypt = require('bcrypt');
      console.log('password -->', password)
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("hashed password -->", hashedPassword)
      password = hashedPassword;
      const newAdmin = new this.adminModel({ name, email, password, number, admin });

      const result = await newAdmin.save();
      return { success: true }
    }
    else {
      throw { statusCode: 400, message: 'Admin already exist' };
    }

  }
  private async findAdmin(email: string): Promise<Admin> {
    let admin;
    try {
      admin = await this.adminModel.findOne({ email: email }).exec();
      return admin;
    } catch (error) {
      throw error;
    }
  }
  private async isAdmin(UserId: string) {
    let user;
    try {
      user = await this.adminModel.findOne({ _id: UserId }).exec();
      console.log("user", user);
      return user;
    } catch (error) {
      throw error;
    }
  }
  //update status of rider
  async updateStatus(req, riderId, riderStatus) {
    try {
      const id = req.body.decodeToken.id;
      const isAdmin = await this.isAdmin(id);
      if (!isAdmin) {
        throw { statusCode: 400, message: 'User does not have update access.' };
      }
      const result = await this.riderModel.findOneAndUpdate({ _id: riderId }, { $set: { riderStatus: riderStatus } }, { new: true })
      return result;
    }
    catch (error) {
      throw error;
    }
  }

  //get all rider whose request are pending
  async getAllRider(req) {
    try {
      const id = req.body.decodeToken.id;
      const isAdmin = await this.isAdmin(id);
      if (!isAdmin) {
        throw { statusCode: 400, message: 'User does not have update access.' };
      }
      const riders = await this.riderModel.find().where({ riderStatus: "pending" });
      console.log("riders", riders);
      return riders;
    }
    catch (error) {
      throw error;
    }
  }
    //get all seller whose request are pending
    async getAllSellers(req) {
      try {
        const id = req.body.decodeToken.id;
        const isAdmin = await this.isAdmin(id);
        if (!isAdmin) {
          throw { statusCode: 400, message: 'User does not have update access.' };
        }
        const sellers = await this.sellerModel.find().where({ foodSellerStatus: "pending" });
        console.log("riders", sellers);
        return sellers;
      }
      catch (error) {
        throw error;
      }
    }
  //update status of seller
  async updateSellerStatus(req, sellerId, sellerStatus) {
    try {
      const id = req.body.decodeToken.id;
      const isAdmin = await this.isAdmin(id);
      if (!isAdmin) {
        throw { statusCode: 400, message: 'User does not have update access.' };
      }
      const result = await this.sellerModel.findOneAndUpdate({ _id: sellerId }, { $set: { foodSellerStatus: sellerStatus } }, { new: true })
      return result;
    }
    catch (error) {
      throw error;
    }
  }
  async logout(id: string) {
    await this.adminModel.findOneAndUpdate({ _id: id }, { token: "" })
  }
}



