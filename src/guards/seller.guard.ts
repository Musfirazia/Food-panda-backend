import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';

@Injectable()
export class SellerGuard implements CanActivate {
  constructor() {}
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    // console.log(request);
    const user = request.user;

    console.log("user",user)
    try{
      if (user.seller) {
        console.log("user",user.seller);
      return true;
    }
  }
  catch(e)
  {
    console.log(e.message);
  }
    // throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
  }
}
