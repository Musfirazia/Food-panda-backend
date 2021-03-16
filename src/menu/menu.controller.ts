import { Body, Controller, Get, Param, Res, Req,Post, Patch, Delete, UseGuards } from "@nestjs/common";
import { CreateMenuDTO, UpdateMenuDTO } from "./Menu.dto";
import { MenuService } from "./Menu.service";
import { SellerGuard } from "src/guards/seller.guard";
import { Request, Response } from 'express';

@Controller('menu')

export class MenuController {
    constructor(private readonly MenuService: MenuService) {

    }

    @Post()
    async addMenu(@Req() req: Request, @Body('category') category: string, @Body() Menu: CreateMenuDTO) {
        const generatedId = await this.MenuService.insertMenu(req, category,Menu);
        return generatedId;
    }
    // @Get('/mine/:id')
    // async listMine(@User() user: UserDocument): Promise<Menu[]> {
    //     const { _id } = user;
    //     console.log(_id);
    //     return await this.MenuService.findByOwner(_id);
    // }


    //get menu by seller
    @Get('/seller/:id')
    async listBySeller(@Param('id') id: string) {
        return await this.MenuService.findBySeller(id);
    }

    @Get()
    async getAllMenu() {
        const Menu = await this.MenuService.getMenu();
        return Menu;
    }

    //get single menu
    @Get(':id')
    async getMenu(@Param('id') prodId: string) {
        const Menu = await this.MenuService.getSingleMenu(prodId);
        return { Menu: Menu };
    }

    //update menu
    @Patch(':id')
    async updateMenu(@Req() req:Request,
        @Param('id') menuId: string,
        @Body('text') Menu: UpdateMenuDTO,@Body('category') category: string){
            const updatedMenu = await this.MenuService.updateMenu(menuId, Menu,category,req);
        return updatedMenu;
    }
    // @Delete(':id')
    // @UseGuards(SellerGuard)

    // async removeMenu(@Param('id') prodId: string, @User() user: UserDocument): Promise<Menu> {
    //     const { _id: userId } = user;
    //     return await this.MenuService.deleteMenu(prodId, userId);
    // }

}
