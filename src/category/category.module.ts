import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';
import {AdminSchema} from "../admin/admin.model";
import { CategoryController } from "./category.controller";
import { CategoryService } from "./category.service";
@Module({
    imports: [MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema },{ name: 'Admin', schema: AdminSchema },
    ])],
    controllers: [CategoryController],
    providers: [CategoryService],

})

export class CategoryModule {

}
