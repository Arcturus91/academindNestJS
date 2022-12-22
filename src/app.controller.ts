import { Controller, Get, Header } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
    //the content type in this case is html/text
  }
}

//in case we would have:

/*
@Get()
  @Header('Content-Type', 'text/html') // you can use header decorator to force the text html output.
getHello():{name:string}{
  return { name: "Max"}
}
we would see the type response as json.
So, Nest is pretty smart for delivering the content of the response. For example, it sets the headers
Notice you just have to change the type of the response in the method to change the response content type header.
*/
