import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { ProductsController } from './products.controller'
import { ProductsService } from './products.service';
import {UserSchema} from "../user/user.model"
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }, { name: "User", schema: UserSchema },
])],
    controllers: [ProductsController],
    providers: [ProductsService],

})

export class ProductsModule {

}