import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('home')
  getHome() {
    return {};
  }

  @Get('forms/person')
  @Render('person-form')
  getPerson() {
    return {};
  }

  @Get('forms/request')
  @Render('request-form')
  getRequest() {
    return {};
  }

  @Get('records')
  @Render('records')
  getRecords() {
    return {};
  }
}