import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from '../user/user.model';
import { SellerSchema} from "../foodSeller/foodSeller.model";
@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema },{ name: 'Seller', schema: SellerSchema }])],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
