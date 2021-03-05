import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Rider } from './rider.model';
import { User } from 'src/user/user.model';

@Injectable()
export class RiderService {
  constructor(@InjectModel('Rider') private readonly riderModel: Model<Rider>,
    @InjectModel('User') private readonly userModel: Model<User>) {

  }
  async addRider(userId: string, vehicle: string, vehiclePlate: string, vehicleColor: string) {
    try {
      const rider = await this.riderModel.create({ userId, vehicle, vehiclePlate, vehicleColor });
      console.log("rider",rider);
      await rider.save();
      return rider.populate('userId');
    }
    catch (err) {
      throw { status: 400, message: err.message };
    }
  }

  findAll() {
    return `This action returns all rider`;
  }

  findOne(id: number) {
    return `This action returns a #${id} rider`;
  }

  update(id: number) {
    return `This action updates a #${id} rider`;
  }

  remove(id: number) {
    return `This action removes a #${id} rider`;
  }
}
