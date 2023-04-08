import { Module } from '@nestjs/common';
import { ChatsGateway } from './chats.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { Chatting, ChattingSchema } from './models/chttings.model';
import { SocketSchema, Socket } from './models/sockets.model';
@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Chatting.name, schema: ChattingSchema },
      { name: Socket.name, schema: SocketSchema }
    ])
  ],
  providers: [ChatsGateway]
})
export class ChatsModule { }
