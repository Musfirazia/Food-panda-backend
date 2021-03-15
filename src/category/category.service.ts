import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.model';
import { User } from "../user/user.model";
import { Admin } from "../admin/admin.model";

@Injectable()
export class CategoryService {
  constructor(@InjectModel('Category') private readonly CategoryModel: Model<Category>,
    @InjectModel('Admin') private readonly adminModel: Model<Admin>,
  ) {

  }
  async addCategory(req, name, status) {

    //is admin check 

    try {
      const id = req.body.decodeToken.id;
      const isAdmin = await this.findAdmin(id);
      console.log("isAdmin",isAdmin);
      if (!isAdmin) {
        throw { statusCode: 400, message: 'User is not admin' };
      }
      const Category = await this.CategoryModel.create({
        name, status
      });
      await Category.save();
      return Category.populate('customerId');
    }
    catch (error) {
      throw error;
    }
  }
  async getCategories() {
    try {
      const Categories = await this.CategoryModel.find();
      return Categories;
    }
    catch (error) {
      throw error;
    }
  }
  private async findAdmin(UserId: string) {
    let user;
    try {
      user = await this.adminModel.findOne({ _id: UserId }).exec();
      console.log("user", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

}



