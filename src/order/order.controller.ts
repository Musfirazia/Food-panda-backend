import { Body, Controller, Get, Param, Post, Res, Req, Patch, Delete } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Request, Response } from 'express';

@Controller('order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {

  }
  @Post(":id")
  addOrder(@Param('id') customerId: string, @Req() req: Request, @Res() res: Response) {
    try {
      const result = this.orderService.addOrder(customerId, req.body.foodSeller, req.body.riderId, req.body.totalPrice, req.body.ordered_food, req.body.order_status, req.body.location_to, req.body.location_from);
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
}