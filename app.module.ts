import { Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ChatsModule } from './chats/chats.module';
import mongoose from 'mongoose';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // 앱모듈에서만 이렇게 하면 어디서든지 사용가능
  }),
  MongooseModule.forRoot(process.env.MONGODB_URI),
    ChatsModule,

  ],
  controllers: [AppController],
})

export class AppModule implements NestModule {
  configure() {
    const DEBUG = process.env.MODE === 'dev' ? true : false;
    mongoose.set('debug', DEBUG); //개발할때 몽구스 쿼리가 찍힘 프로젝트 배포시에는 false로
  }
} 
