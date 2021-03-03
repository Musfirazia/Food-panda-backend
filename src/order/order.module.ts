import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema } from './order.model';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }, 
    ])],
    controllers: [],
    providers: [],

})

export class UserModule  {

}
