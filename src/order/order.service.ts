import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { Seller } from "../foodSeller/foodSeller.model";
import { User } from "../user/user.model";
import { NodemailerService } from '../nodemailer/nodemailer.service'

@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly NodemailerService: NodemailerService

  ) { }

  async addOrder(req, foodSeller, riderId, totalPrice, ordered_food, order_status, location_to, location_from) {

    try {
      const customerId = req.body.decodeToken.id;
      console.log(customerId);
      const Order = await this.orderModel.create({
        customerId, foodSeller, riderId, totalPrice, ordered_food, order_status, location_to, location_from
      });
      await Order.save();
      const { name, email } = await this.userModel.findOne({ _id: customerId }).exec();
      const message = "Hey " + name + ", thanks for your order! We’ll let you know when it’s on its way. <br/> your order details are: <br/> Total price: " + totalPrice;
      const emailResult = await this.NodemailerService.sendEmail(req, message, email);
      console.log("emailResult", emailResult);
      return Order.populate('customerId');
    }
    catch (error) {
      throw error;
    }
  }


}



