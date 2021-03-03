import { Body, Controller, Get, Param, Post, Patch, Delete, UseGuards } from "@nestjs/common";
import { CreateProductDTO, UpdateProductDTO } from "./product.dto";
import { ProductsService } from "./products.service";
import { User as UserDocument } from '../user/user.model';
import { Product } from "../products/product.model"
import { User } from "../utilities/user.decorator";
import { SellerGuard } from "src/guards/seller.guard";
@Controller('product')

export class ProductsController {
    constructor(private readonly productsService: ProductsService) {

    }
    @Get('/mine/:id')
    async listMine(@User() user: UserDocument): Promise<Product[]> {
        const { _id } = user;
        console.log(_id);
        return await this.productsService.findByOwner(_id);
    }

    @Get('/seller/:id')
    async listBySeller(@Param('id') id: string): Promise<Product[]> {
        return await this.productsService.findByOwner(id);
    }

    @Post(':id')
    async addProduct(@Param('id') id: string, @Body() product: CreateProductDTO): Promise<Product> {
        const generatedId = await this.productsService.insertProduct(product, id);
        return generatedId;
    }
    @Get()
    async getAllProducts() : Promise<Product[]>{
        const product = await this.productsService.getProducts();
        return product;
    }

    @Get(':id')
    async getProduct(@Param('id') prodId: string) {
        const products = await this.productsService.getSingleProduct(prodId);
        return { products: products };
    }
    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('text') product: UpdateProductDTO,
        @User() user: UserDocument): Promise<Product> {
      const  userId="5fd4ad9e8fae2e2f447bd900";
        const updatedproduct = await this.productsService.updateProduct(prodId, product, userId);
        return updatedproduct;
    }
    @Delete(':id')
    @UseGuards(SellerGuard)

    async removeProduct(@Param('id') prodId: string, @User() user: UserDocument): Promise<Product> {
        const { _id: userId } = user;
        return await this.productsService.deleteProduct(prodId, userId);
    }

}
