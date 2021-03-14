import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggerMiddleware } from './loggerMiddleware';
import { ConfigModule } from '@nestjs/config';

import { UserModule } from './user/user.module';
import { MenuModule } from './Menu/menu.module';
import {SellerModule} from "./foodSeller/foodSeller.module";
import {RiderModule} from "./rider/rider.module";
import {OrderModule} from "./order/order.module";
import {PaymentModule} from "./payment/payment.module";
const config = require("../Config/key.js");
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';

import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
@Module({  
  imports: [ConfigModule.forRoot(),RiderModule,SellerModule,MenuModule,UserModule,MongooseModule.forRoot(config.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true }), AuthModule,OrderModule,PaymentModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'auth/seller/login', method: RequestMethod.ALL },
        { path: 'user/signup', method: RequestMethod.ALL },
        { path: 'seller/signup', method: RequestMethod.ALL },

      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
