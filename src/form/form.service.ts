import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FormService {
  private readonly basePath = path.join(process.cwd(), 'data', 'forms');

  constructor() {
    console.log('FormService initialized. Current CWD:', process.cwd());
    console.log('Base Path:', this.basePath);
    if (!fs.existsSync(this.basePath)) {
      console.log('Creating directory:', this.basePath);
      fs.mkdirSync(this.basePath, { recursive: true });
    }
  }

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
    console.log('Listing records execution - CWD:', process.cwd());
    console.log('Target Base Path:', this.basePath);
    if (!fs.existsSync(this.basePath)) {
      console.log('Base Path does NOT exist:', this.basePath);
      return [];
    }

    const files = fs.readdirSync(this.basePath).filter((file) => file.endsWith('.txt'));
    console.log('Files found:', files);
    return files;
  }

  readRecord(filename: string) {
    const filePath = path.join(this.basePath, filename);
    return fs.readFileSync(filePath, 'utf-8');
  }
}