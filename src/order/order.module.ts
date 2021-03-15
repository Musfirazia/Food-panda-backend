import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.model';
import { SellerSchema } from "../foodSeller/foodSeller.model";
import { UserSchema } from "../user/user.model";
import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";
import {NodemailerService } from "../nodemailer/nodemailer.service";
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, { name: 'User', schema: UserSchema }, { name: 'Seller', schema: SellerSchema }
    ])],
    controllers: [OrderController],
    providers: [OrderService,NodemailerService],

})

export class OrderModule {

}
