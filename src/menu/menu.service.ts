import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Menu } from './Menu.model';
import { Model } from 'mongoose';
import { CreateMenuDTO, UpdateMenuDTO } from './Menu.dto';
import { Seller } from "../foodSeller/foodSeller.model";
@Injectable()
export class MenuService {
    constructor(@InjectModel('Menu') private readonly MenuModel: Model<Menu>,
        @InjectModel('Seller') private readonly sellerModel: Model<Seller>) {

    }
    async insertMenu(req, category: string,MenuDTO: CreateMenuDTO): Promise<Menu> {
        const foodSeller=req.body.decodeToken.id;
        const seller = await this.sellerModel.findById(foodSeller);
        if (seller !== null) {
            const Menu = await this.MenuModel.create({
                foodSeller,
                ...MenuDTO,
                category
            });
            await Menu.save();
            console.log(Menu);
            return Menu.populate('foodSeller');
        }
        else {
            throw new NotFoundException("could n't find any seller");

        }


    }
    async findBySeller(id: string) {
        const Menu = await this.MenuModel.find({ foodSeller: id });
        console.log("menu",Menu)
        if(Menu[0] ==null){
            throw new NotFoundException("could n't find any menu related to this seller");
        }
        return Menu;
    }
    async getMenu() {
        const Menu = await this.MenuModel.find().populate('foodSeller');
        return await this.MenuModel.find().populate('foodSeller');

    }
    async getSingleMenu(MenuId: string) {
        let Menu = "";
        try {
            Menu = await this.MenuModel.findById(MenuId).populate('foodSeller')
        }
        catch (error) {
            throw new NotFoundException("could n't find any Menu");

        }
        if (!Menu) {
            throw new NotFoundException("could n't find any Menu");

        }
        return Menu;
    }
    async updateMenu(menuId: string, MenuDTO: UpdateMenuDTO,category: string, req): Promise<Menu> {
        const sellerId = req.body.decodeToken.id;
        const Menu = await this.MenuModel.findById(menuId);

        console.log("Menu", Menu);
        if (sellerId.toString() !== Menu.foodSeller.toString()) {
            throw new HttpException("You do not own this Menu", HttpStatus.UNAUTHORIZED);
        }
        if(MenuDTO)
        {
            Menu.MenuDTO=MenuDTO;
        }
        if(category)
        {
            Menu.category=category;
        }
        return await Menu.save()
    }

    async deleteMenu(prodId: string, userId: string): Promise<Menu> {
        const Menu = await this.MenuModel.findById(prodId);
        if (userId !== Menu.owner.toString()) {
            throw new HttpException("You do not own this Menu", HttpStatus.UNAUTHORIZED);
        }
        return await Menu.remove();
         
    }
}