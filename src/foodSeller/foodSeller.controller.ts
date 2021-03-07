import { Body, Controller, Request, Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { SellerService } from "./foodSeller.service";
import { Address } from "./foodSeller.model";
@Controller('seller')
export class SellerController {
    constructor(private readonly sellerService: SellerService) {

    }
    @Post('signup')
    async addUser(@Body('name') userName: string,
        @Body('email') email: string,
        @Body('password') password: string,
        @Body('contactNumber') contactNumber: string,
        @Body('BusinessName') BusinessName: string,
        @Body('Pickup') Pickup: boolean,
        @Body('FoodDelivery') FoodDelivery: boolean,
        @Body('address') address: Address,
        @Body('availableArea') availableArea: Address) {
        const generatedId = await this.sellerService.insertUser(userName, email, password, contactNumber, BusinessName, Pickup, FoodDelivery, address, availableArea);
        return { success: generatedId.success };
    }

    // async login(@Request() req,@Body('email') userEmail:string,@Body('password') password:string)
    // {
    //     const status=await this.userService.login(userEmail,password)
    //     req._cookies = [
    //         {
    //             name:"w_authExp",
    //             value: status.user.tokenExp,
    //           options: {
    //             expires: new Date(Date.UTC(2030, 1, 1, 1, 1)),
    //             sameSite: true,
    //           },
    //         },
    //         {name:"w_auth", value:status.user.token},
    //       ];
    //     // cookies([{name:"w_authExp",value: status.user.tokenExp},{name:"w_auth", value:status.user.token}])

    //     return{status:status}
    // }

    // @Get('logout')
    // async logout(@Body('id') userId:string)
    // { 
    //  await this.sellerService.logout(userId);
    // }

}