import { Body, Controller,  Request,Get, Param, Post, Patch, Delete } from "@nestjs/common";
import { UserService } from "./user.service";
  
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {

    }
    @Post('signup')
    async addUser(@Body('name') userName: string,
        @Body('email') userEmail: string,
        @Body('password') password: string,
        @Body('number') number: string,
        @Body('admin') admin?: boolean) {
        const generatedId = await this.userService.insertUser(userName,userEmail,password,number,admin);
        return { success:generatedId.success };
    }
    // @Post('login')
    
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
    
    @Get('logout')
    async logout(@Body('id') userId:string)
    {
        
     await this.userService.logout(userId);
    }
    
}