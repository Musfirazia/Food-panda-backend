import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from "@nestjs/common";
import { CreateMenuDTO, UpdateMenuDTO } from "./Menu.dto";
import { MenuService } from "./Menu.service";
// import { User as UserDocument } from '../user/user.model';
// import { User } from "../utilities/user.decorator";
import { SellerGuard } from "src/guards/seller.guard";
@Controller('Menu')

export class MenuController {
    constructor(private readonly MenuService: MenuService) {

    }

    @Post(':id')
    async addMenu(@Param('id') foodSeller: string, @Body('category') category: string, @Body() Menu: CreateMenuDTO) {
        const generatedId = await this.MenuService.insertMenu(Menu, foodSeller, category);
        return generatedId;
    }
    // @Get('/mine/:id')
    // async listMine(@User() user: UserDocument): Promise<Menu[]> {
    //     const { _id } = user;
    //     console.log(_id);
    //     return await this.MenuService.findByOwner(_id);
    // }

    // @Get('/seller/:id')
    // async listBySeller(@Param('id') id: string): Promise<Menu[]> {
    //     return await this.MenuService.findByOwner(id);
    // }

    // @Get()
    // async getAllMenu() : Promise<Menu[]>{
    //     const Menu = await this.MenuService.getMenu();
    //     return Menu;
    // }

    // @Get(':id')
    // async getMenu(@Param('id') prodId: string) {
    //     const Menu = await this.MenuService.getSingleMenu(prodId);
    //     return { Menu: Menu };
    // }
    // @Patch(':id')
    // async updateMenu(
    //     @Param('id') prodId: string,
    //     @Body('text') Menu: UpdateMenuDTO,
    //     @User() user: UserDocument): Promise<Menu> {
    //   const  userId="5fd4ad9e8fae2e2f447bd900";
    //     const updatedMenu = await this.MenuService.updateMenu(prodId, Menu, userId);
    //     return updatedMenu;
    // }
    // @Delete(':id')
    // @UseGuards(SellerGuard)

    // async removeMenu(@Param('id') prodId: string, @User() user: UserDocument): Promise<Menu> {
    //     const { _id: userId } = user;
    //     return await this.MenuService.deleteMenu(prodId, userId);
    // }

}
