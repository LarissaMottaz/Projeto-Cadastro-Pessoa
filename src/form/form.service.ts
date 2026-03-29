import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FormService {
  private readonly basePath = path.join(process.cwd(), 'data', 'forms');

  savePersonForm(data: { nome: string; email: string; telefone: string; cidade: string }) {
    const id = Date.now().toString();
    const filename = `person-${id}.txt`;
    const content =
`Tipo: cadastro_pessoa
ID: ${id}
Nome: ${data.nome}
Email: ${data.email}
Telefone: ${data.telefone}
Cidade: ${data.cidade}
`;

    fs.writeFileSync(path.join(this.basePath, filename), content, 'utf-8');
    return filename;
  }

  saveRequestForm(data: { nome: string; assunto: string; descricao: string; data: string }) {
    const id = Date.now().toString();
    const filename = `request-${id}.txt`;
    const content =
`Tipo: solicitacao
ID: ${id}
Nome: ${data.nome}
Assunto: ${data.assunto}
Descricao: ${data.descricao}
Data: ${data.data}
`;

    fs.writeFileSync(path.join(this.basePath, filename), content, 'utf-8');
    return filename;
  }

  listRecords() {
    if (!fs.existsSync(this.basePath)) {
      return [];
    }

    return fs.readdirSync(this.basePath).filter((file) => file.endsWith('.txt'));
  }

  readRecord(filename: string) {
    const filePath = path.join(this.basePath, filename);
    return fs.readFileSync(filePath, 'utf-8');
  }
}