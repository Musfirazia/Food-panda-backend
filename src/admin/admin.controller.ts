import { Body, Controller, Get, Param, Post, Req, Patch, Delete } from "@nestjs/common";
import { AdminService } from "./admin.service";
import { Request, Response } from 'express';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {

    }
    @Post('signup')
    async addAdmin(@Body('name') adminName: string,
        @Body('email') adminEmail: string,
        @Body('password') password: string,
        @Body('number') number: string,
        @Body('admin') admin?: boolean) {
        const generatedId = await this.adminService.insertAdmin(adminName, adminEmail, password, number, admin);
        return { success: generatedId.success };
    }
    @Get("allrider")
    async getRiders(@Req() req: Request) {
        const riders = await this.adminService.getAllRider(req);
        return riders;
    }
    @Get("allseller")
    async getSellers(@Req() req: Request) {
        const riders = await this.adminService.getAllSellers(req);
        return riders;
    }
    @Patch("updatestatus/rider")
    async updateStatus(@Req() req: Request, @Body('riderId') riderId: string,
        @Body('riderStatus') riderStatus: string,
    ) {
        const updateStatus = await this.adminService.updateStatus(req, riderId, riderStatus);
        return { success: true ,updateStatus:updateStatus};
    }
    @Patch("updatestatus/seller")
    async updateSellerStatus(@Req() req: Request, @Body('sellerId') riderId: string,
        @Body('sellerStatus') riderStatus: string,
    ) {
        const updateStatus = await this.adminService.updateSellerStatus(req, riderId, riderStatus);
        return { success: true ,updateStatus:updateStatus};
    }

    @Get('logout')
    async logout(@Body('id') adminId: string) {

        await this.adminService.logout(adminId);
    }

}