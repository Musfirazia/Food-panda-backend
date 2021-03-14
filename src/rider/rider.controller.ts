import { Controller, Get, Body, Put, Param, Patch,Delete, Post, Req } from '@nestjs/common';
import { RiderService } from './rider.service';
import { Request, Response } from 'express';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) { }

  @Post("/register")
  addRider(@Req() req:Request, @Body('orderId') orderId: string, @Body('vehicle') vehicle: string, @Body('vehiclePlate') vehiclePlate: string, @Body('vehicleColor') vehicleColor: string, @Body('currentLocation') currentLocation: string,@Body('riderStatus') riderStatus: string) {
    return this.riderService.addRider(req,orderId, vehicle, vehiclePlate, vehicleColor, currentLocation,riderStatus);
  }
  @Put(":id/update-status")
  updateOrderStatus(@Req() req:Request,@Param('id') userId: string, @Body('orderId') order_Id: string, @Body("order_status") order_status: string) {
    return this.riderService.updateOrderStatus(req,userId, order_Id, order_status)
  }
  @Get(":id/get-status")
  getOrderStatus(@Param('id') userId: string, @Body('orderId') order_Id: string) {
    return this.riderService.getOrderStatus(userId, order_Id)
  }
    @Patch(':id')
    async updateInfo(
        @Param('id')  riderId: string,
        @Body('orderId') orderId: string, @Body('vehicle') vehicle: string, @Body('vehiclePlate') vehiclePlate: string, @Body('vehicleColor') vehicleColor: string, @Body('currentLocation') currentLocation: string,@Body('riderStatus') riderStatus: string) {
        const updated = await this.riderService.updateInfo( riderId, orderId, vehicle, vehiclePlate, vehicleColor, currentLocation,riderStatus);
        return updated;
    }
}
//   @Get(){}
//   findAll() {
//     return this.riderService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.riderService.findOne(+id);
//   }

//   @Put(':id')
//   update(@Param('id') id: string ) {
//     return this.riderService.update(+id, );
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.riderService.remove(+id);
//   }
// }
