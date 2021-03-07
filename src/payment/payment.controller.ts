import { Body, Controller, Get, Param, Post, Res, Req, Patch, Delete } from "@nestjs/common";
import { PaymentService } from "./payment.service";
import { Request, Response } from 'express';

@Controller('payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {

  }
  @Post(":id")
  addpayment(@Param('id') customerId: string, @Req() req: Request, @Res() res: Response) {
    try {
      const result = this.paymentService.addTransaction(customerId, req.body.orderId, req.body.totalPrice, req.body.voucher, req.body.paymentType, req.body.cardDetails, req.body.expiryDate);
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