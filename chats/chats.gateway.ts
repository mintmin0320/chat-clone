import { Logger } from '@nestjs/common';
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, SubscribeMessage, WebSocketGateway } from '@nestjs/websockets';
import { Socket } from 'socket.io';

@WebSocketGateway({ namespace: 'chattings' })
export class ChatsGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect { // OnGatewayInit : afterInit() 메소드를 반드시 구현해야함
  private logger = new Logger('chat');    // OnGatewayConnection : handleConnection 메서드를 강제 구현
  // OnGatewayDisconnect: 클라이언트 서버 연결 끊길 때
  constructor() {
    this.logger.log('constructor')
  }

  handleDisconnect(@ConnectedSocket() socket: Socket) {
    this.logger.log(`disconnected : ${socket.id} ${socket.nsp.name}`)
  }

  handleConnection(@ConnectedSocket() socket: Socket) {
    this.logger.log(`connected : ${socket.id} ${socket.nsp.name}`)
  } // 연결이 되는 순간 실행되는 함수

  afterInit() {
    this.logger.log("init");
  }

  @SubscribeMessage('new_user') // 이벤트 쓰면 해당함수실행
  handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket, //이 소켓으로 에밋과 온 가능
  ) {

    socket.broadcast.emit("user_connected", username);
    return username // 클라에서 emit으로 데이터 보낼때 응답
  }
}
