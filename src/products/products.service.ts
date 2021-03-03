import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';
import { Model } from 'mongoose';
import { CreateProductDTO, UpdateProductDTO } from './product.dto';
import { User } from 'src/user/user.model';
@Injectable()
export class ProductsService {
    constructor(@InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('User') private readonly userModel: Model<User>) {

    }
    // products: Product[] = [];
    async insertProduct(productDTO: CreateProductDTO,id:string): Promise<Product> {
        const seller = await this.userModel.findById(id) .where({ seller: true });
        if(seller !== null){
            const product = await this.productModel.create({
                ...productDTO,
          
              });
              await product.save();
              console.log(product);
              return product.populate('owner');
        }
        else{
            throw new NotFoundException("could n't find any seller");

        }


    }
    async findByOwner(id: string): Promise<Product[]> {
        const product= await this.productModel.find({ owner: id }).populate('owner');
        return product;
    }
    async getProducts() {
        const products = await this.productModel.find().populate('owner');
        return await this.productModel.find().populate('owner');

    }
    async getSingleProduct(productId: string) {
        let product = "";
        try {
            product = await this.productModel.findById(productId).populate('owner')
        }
        catch (error) {
            throw new NotFoundException("could n't find any product");

        }
        if (!product) {
            throw new NotFoundException("could n't find any product");

        }
        return product;
    }
    async updateProduct(prodId: string, productDTO: UpdateProductDTO,userId:string): Promise<Product> {
        const product = await this.productModel.findById(prodId);
    
        console.log("hvh",product.owner);
        if("5fd495bdb7560f1c102a64d6" !== product.owner){
            throw new HttpException("You do not own this product",HttpStatus.UNAUTHORIZED);
        }
        await product.updateProduct(productDTO);
        return await this.productModel.findById(prodId).populate('owner');
    }

    async deleteProduct(prodId: string,userId:string): Promise<Product> {
        const product = await this.productModel.findById(prodId);
        if(userId !==product.owner.toString()){
            throw new HttpException("You do not own this product",HttpStatus.UNAUTHORIZED);
        }
        await product.remove();
        return product.populate('owner');
    }
}