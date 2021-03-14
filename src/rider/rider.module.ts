import { Module } from '@nestjs/common';
import { RiderService } from './rider.service';
import { RiderController } from './rider.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {riderSchema} from "./rider.model";
import {UserSchema} from "../user/user.model";
import {OrderSchema} from "../order/order.model"

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Rider', schema: riderSchema },{ name: 'User', schema: UserSchema },{ name: 'Order', schema: OrderSchema },
])],
  controllers: [RiderController],
  providers: [RiderService]
})
export class RiderModule {}
