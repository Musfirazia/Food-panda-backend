import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AdminController } from './admin.controller';
import { AdminSchema } from './admin.model';
import {riderSchema} from "../rider/rider.model";
import { AdminService } from './admin.service';
import {SellerSchema} from "../foodSeller/foodSeller.model";
// import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Admin', schema: AdminSchema }, { name: 'Rider', schema: riderSchema }, { name: 'Seller', schema: SellerSchema }, 
    ])],
    controllers: [AdminController],
    providers: [AdminService],

})

export class AdminModule  {

}
