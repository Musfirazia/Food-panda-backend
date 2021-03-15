import { Body, Controller, Get, Param, Post, Res, Req, Patch, Delete } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Request, Response } from 'express';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {

  }
  @Post()
  async addcategory( @Req() req: Request, @Res() res: Response) {
    try {
      const result = await this.categoryService.addCategory(req,req.body.name,req.body.status);
      res.status(200).send({
        responseCode: 200,
        result: result,
      });
    } catch (error) {
      res.status(error.statusCode ? error.statusCode : 500).send({
        responseCode: error.statusCode,
        result: error.message,
      });
    }
  }
    @Get()
    async getAllCategory(){
        const Menu = await this.categoryService.getCategories();
        return Menu;
    }

}