import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rider } from './rider.model';
import { User } from 'src/user/user.model';
import { Order } from 'src/order/order.model';

@Injectable()
export class RiderService {
  constructor(@InjectModel('Rider') private readonly riderModel: Model<Rider>,
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('Order') private readonly orderModel: Model<Order>) {

  }
  async addRider(req, orderId: string, vehicle: string, vehiclePlate: string, vehicleColor: string, currentLocation: string, riderStatus: string) {
    try {
      const userId=req.body.decodeToken.id;
      const checkUser = await this.findUser(userId);
      if (!checkUser) {
        throw { statusCode: 401, message: "Please first register as a user" };
      }
      const checkRider = await this.riderModel.findOne({ UserId: checkUser._id }).exec();
      if (checkRider) {
        throw { statusCode: 404, message: 'Rider is already registered' };
      }
      const rider = await this.riderModel.create({ userId, orderId, vehicle, vehiclePlate, vehicleColor, currentLocation, riderStatus });
      await rider.save();
      return rider.populate('userId');
    }
    catch (err) {
      throw { status: 400, message: err.message };
    }
  }
  async getOrderStatus(userId: string, order_Id: string) {
    const result = await this.orderModel
      .findOne({ _id: order_Id })
      .then(prop => {
        console.log("prop", prop);
        return prop.order_status;
      })
      .catch(err => {
        throw err;
      });
    return result;
  }
  async updateOrderStatus(req,_id: string, order_Id: string, order_status: string) {
    try {
      const _id=req.body.decodeToken.id;
      const rider = await this.riderModel.findById(_id);
      if (rider.riderStatus == "pending") {
        throw { statusCode: 404, message: 'Rider is not registered' };
      }
      else {
        const result = await this.orderModel.findOneAndUpdate({ _id: order_Id }, { $set: { order_status: order_status } }, { new: true })
        console.log("result", result);
        return { result: result.order_status }
      }
    }
    catch (err) {
      throw { status: 400, message: err.message };
    }
  }
  findAll() {
    return `This action returns all rider`;
  }
  //find rider is registered as a user
  private async findUser(UserId: string): Promise<User> {
    let user;
    try {
      user = await this.userModel.findOne({ _id: UserId }).exec();
      console.log("user", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  //update rider Info
  async updateInfo(_id: string, orderId, vehicle, vehiclePlate, vehicleColor, currentLocation, riderStatus) {
    const rider = await this.riderModel.findById(_id);
    if (rider == null) {
      throw { statusCode: 404, message: 'Rider is not registered' };
    }
    // const updatedProduct={...product}
    if (orderId) {
      rider.orderId = vehicle;
    }
    if (vehicle) {
      rider.vehicle = vehicle;
    }
    if (vehiclePlate) {
      rider.vehiclePlate = vehiclePlate;
    }
    if (vehicleColor) {
      rider.vehicleColor = vehicleColor;
    }
    if (currentLocation) {
      rider.crurrentLocation = currentLocation;
    }
    if (riderStatus) {
      rider.riderStatus = riderStatus;
    }
    const prod=await rider.save()
    return prod
  }
  update(id: number) {
    return `This action updates a #${id} rider`;
  }

  remove(id: number) {
    return `This action removes a #${id} rider`;
  }
}
