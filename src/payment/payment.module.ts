import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentSchema } from './payment.model';
import { SellerSchema } from "../foodSeller/foodSeller.model";
import { UserSchema } from "../user/user.model";
import { PaymentController } from "./payment.controller";
import { PaymentService } from "./payment.service";
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Payment', schema: PaymentSchema }, { name: 'User', schema: UserSchema }, { name: 'Seller', schema: SellerSchema }
    ])],
    controllers: [PaymentController],
    providers: [PaymentService],

})

export class PaymentModule {

}
