import { Body, Controller, Get, Param, Post, Render } from '@nestjs/common';
import { FormService } from './form.service';

@Controller()
export class FormController {
  constructor(private readonly formService: FormService) {}

  @Get()
  @Render('home')
  home() {
    return {};
  }

  @Get('forms/person')
  @Render('person-form')
  personForm() {
    return {};
  }

  @Post('forms/person')
  @Render('success')
  submitPersonForm(
    @Body() body: { nome: string; email: string; telefone: string; cidade: string },
  ) {
    const filename = this.formService.savePersonForm(body);
    return {
      mensagem: 'Cadastro de pessoa salvo com sucesso.',
      filename,
    };
  }

  @Get('forms/request')
  @Render('request-form')
  requestForm() {
    return {};
  }

  @Post('forms/request')
  @Render('success')
  submitRequestForm(
    @Body() body: { nome: string; assunto: string; descricao: string; data: string },
  ) {
    const filename = this.formService.saveRequestForm(body);
    return {
      mensagem: 'Solicitação salva com sucesso.',
      filename,
    };
  }

  @Get('records')
  @Render('records')
  records() {
    const files = this.formService.listRecords();
    return { files };
  }

  @Get('records/:filename')
  @Render('record-detail')
  recordDetail(@Param('filename') filename: string) {
    const content = this.formService.readRecord(filename);
    return { filename, content };
  }
}