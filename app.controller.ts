import { Get, Controller, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')  // main에서 지정해준 view폴더 안에 index를 찾아서 렌더링하라
  root() {
    return {
      data: {
        title: "Chattings",
        copyright: "mintmin"
      }
    }; //index.hbs에 messge에 닮긴다
  }
}