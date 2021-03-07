import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MenuSchema } from './menu.model';
import { MenuController } from './menu.controller'
import { MenuService } from './menu.service';
import { SellerSchema } from "../foodSeller/foodSeller.model"
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Menu', schema: MenuSchema }, { name: "Seller", schema: SellerSchema },
    ])],
    controllers: [MenuController],
    providers: [MenuService],

})

export class MenuModule {

}