import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from './payment.model';
import { Seller } from "../foodSeller/foodSeller.model";
import { User } from "../user/user.model";

@Injectable()
export class PaymentService {
  constructor(@InjectModel('Payment') private readonly PaymentModel: Model<Payment>,
    @InjectModel('User') private readonly userModel: Model<User>,
  ) {

  }
  async addTransaction(customerId, orderId, totalPrice, voucher, paymentType, cardDetails, expiryDate) {
    try {
      const Payment = await this.PaymentModel.create({
        customerId, orderId, totalPrice, voucher, paymentType, cardDetails, expiryDate
      });
      await Payment.save();
      return Payment.populate('customerId');

    }
    catch (error) {
      throw error;
    }
  }


}



