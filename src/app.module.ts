import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ProductsModule } from './products/products.module';
import { LoggerMiddleware } from './loggerMiddleware';
import { ConfigModule } from '@nestjs/config';

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
  imports: [ConfigModule.forRoot(),ProductsModule,UserModule,MongooseModule.forRoot(config.mongoURI,{ useNewUrlParser: true, useUnifiedTopology: true }), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware)
      .exclude(
        { path: 'auth/login', method: RequestMethod.ALL },
        { path: 'user/signup', method: RequestMethod.ALL },

      )
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
