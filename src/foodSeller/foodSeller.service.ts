import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Seller } from "./foodSeller.model";
import { Address } from "./foodSeller.model";
@Injectable()
export class SellerService {
    constructor(@InjectModel('Seller') private readonly sellerModel: Model<Seller>) {
    }
    async insertUser(name: string,
        email: string,
        password: string,
        contactNumber: string,
        businessName: string,
        pickup: boolean,
        foodDelivery: boolean,
        address: Address,
        availableArea: Address,
    ) {
        try {
            const uniqueUser = await this.findUser(email);
            if (!uniqueUser) {
                const bcrypt = require('bcrypt');
                const hashedPassword = await bcrypt.hash(password, 10);
                password = hashedPassword;
                const newProduct = new this.sellerModel({ name, email, password, contactNumber, businessName, pickup, foodDelivery, address, availableArea });

                const result = await newProduct.save();
                return { success: true }
            }
            else {
                throw { statusCode: 400, message: 'User already exist' };
            }


        }
        catch (error) {
            throw error;
        }

    }
    private async findUser(email: string): Promise<Seller> {
        let user;
        try {
            user = await this.sellerModel.findOne({ email: email }).exec();
            return user;
        } catch (error) {
            throw error;
        }
    }
    //  async findByfoodSeller(id: string): Promise<Menu[]> {
    //     const Menu= await this.MenuModel.find({ foodSeller: id }).populate('foodSeller');
    //     return Menu;
    // }
}
