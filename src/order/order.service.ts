import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.model';
import { Seller } from "../foodSeller/foodSeller.model";
@Injectable()
export class OrderService {
  constructor(@InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('Seller') private readonly sellerModel: Model<Seller>,
  ) { }

  async addOrder(req, foodSeller, riderId, totalPrice, ordered_food, order_status, location_to, location_from) {
    try {
      const customerId=req.body.decodeToken.id;
      const Order = await this.orderModel.create({
        customerId, foodSeller, riderId, totalPrice, ordered_food, order_status, location_to, location_from
      });
      await Order.save();
      return Order.populate('customerId');
    }
    catch (error) {
      throw error;
    }
  }


}



