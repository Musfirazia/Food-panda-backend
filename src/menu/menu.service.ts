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
    async insertMenu(req,MenuDTO: CreateMenuDTO, category: string): Promise<Menu> {
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
    async findByOwner(id: string): Promise<Menu[]> {
        const Menu = await this.MenuModel.find({ owner: id }).populate('owner');
        return Menu;
    }
    async getMenu() {
        const Menu = await this.MenuModel.find().populate('owner');
        return await this.MenuModel.find().populate('owner');

    }
    async getSingleMenu(MenuId: string) {
        let Menu = "";
        try {
            Menu = await this.MenuModel.findById(MenuId).populate('owner')
        }
        catch (error) {
            throw new NotFoundException("could n't find any Menu");

        }
        if (!Menu) {
            throw new NotFoundException("could n't find any Menu");

        }
        return Menu;
    }
    async updateMenu(prodId: string, MenuDTO: UpdateMenuDTO, userId: string): Promise<Menu> {
        const Menu = await this.MenuModel.findById(prodId);

        console.log("hvh", Menu.owner);
        if ("5fd495bdb7560f1c102a64d6" !== Menu.owner) {
            throw new HttpException("You do not own this Menu", HttpStatus.UNAUTHORIZED);
        }
        await Menu.updateMenu(MenuDTO);
        return await this.MenuModel.findById(prodId).populate('owner');
    }

    async deleteMenu(prodId: string, userId: string): Promise<Menu> {
        const Menu = await this.MenuModel.findById(prodId);
        if (userId !== Menu.owner.toString()) {
            throw new HttpException("You do not own this Menu", HttpStatus.UNAUTHORIZED);
        }
        await Menu.remove();
        return Menu.populate('owner');
    }
}