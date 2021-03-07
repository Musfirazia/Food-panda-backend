import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SellerController } from './foodSeller.controller';
import { SellerSchema } from './foodSeller.model';
import { SellerService } from './foodSeller.service';


@Module({
    imports: [MongooseModule.forFeature([{ name: 'Seller', schema: SellerSchema },
    ])],
    controllers: [SellerController],
    providers: [SellerService],
})
export class SellerModule {
}
