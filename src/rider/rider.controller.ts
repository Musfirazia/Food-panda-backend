import { Controller, Get, Post, Body, Put, Param, Delete } from '@nestjs/common';
import { RiderService } from './rider.service';

@Controller('rider')
export class RiderController {
  constructor(private readonly riderService: RiderService) {}

  @Post(":id")
  addRider(@Param('id') userId:string,@Body('vehicle') vehicle:string,@Body('vehiclePlate') vehiclePlate:string,@Body('vehicleColor') vehicleColor:string) {
    return this.riderService.addRider(userId,vehicle,vehiclePlate,vehicleColor);
  }

  @Get()
  findAll() {
    return this.riderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.riderService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string ) {
    return this.riderService.update(+id, );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.riderService.remove(+id);
  }
}
