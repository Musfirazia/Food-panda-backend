import { Body, Controller,  Request,Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { OrderService } from "./order.service";
  
@Controller('order')
export class OrderController {
    constructor(private readonly orderService: OrderService) {

    }
}