# BackEnd-Desafio-FernandaKipper

# Sistema de Alerta e Evacuação para Enchentes e Queimadas

Este projeto é um sistema abrangente para monitoramento, alerta e suporte psicológico focado em desastres naturais, como enchentes e queimadas. O sistema permite o cadastro de usuários, análise de riscos climáticos, envio de alertas personalizados e suporte psicológico online.

## Funcionalidades

- **Sistema de Alerta e Evacuação**

  - Cadastro de Usuários: Coleta de informações pessoais e de localização.
  - Análise de Risco: Integração com serviços meteorológicos para cálculo de probabilidade de desastres.
  - Envio de Alertas: Mensagens personalizadas via e-mail, SMS e WhatsApp com base no grau de risco.

- **Pós-Desastre**

  - Acolhimento Psicológico Online: Cadastro de profissionais, agendamento de sessões e chat 24 horas.
  - Blog de Orientações: Artigos, vídeos e mensagens de apoio.

- **Cadastro de Desastres**
  - Mapeamento de Área: Perguntas específicas para identificar áreas de risco e histórico de desastres.

## Configuração e Execução

### Pré-requisitos

- PostgreSQL instalado e configurado.
- Node.js e NPM na versão estável mais recente.

### Configurando o Banco de Dados

1. **Acesse o PostgreSQL:**

   ```bash
   psql -U SEU_USUARIO
   ```

   Substitua `SEU_USUARIO` pelo seu nome de usuário do PostgreSQL.

2. **Crie um Banco de Dados:**

   Dentro do ambiente do PostgreSQL, crie um novo banco de dados:

   ```sql
   CREATE DATABASE NOME_DO_BANCO;
   ```

3. **Configure o arquivo `.env`:**

   Crie um arquivo `.env` na raiz do projeto com o seguinte formato:

   ```env
   DATABASE_URL=postgresql://postgres:root@localhost:5432/KeperDev?schema=public
   AUTHTOKEN=
   ACOUNTSID=
   TWILIONUMBER=
   PERSONALNUMBER=
   LINKWEB=
   APIKEY=
   HOST=
   SMTP_USERNAME=
   SMTP_PASSWORD=
   SMTP_PORT=
   NODEMAILER_EMAIL=

   AWS_ACCESS_KEY=
   AWS_SECRET_ACCESS_KEY=
   AWS_REGION=
   AWS_API_VERSION=
   ```

### Configuração para Envio de Mensagens

- **WhatsApp**: Para enviar mensagens via WhatsApp, é necessário criar uma conta no Twilio e configurar as credenciais (`AUTHTOKEN`, `ACOUNTSID`, `TWILIONUMBER`, `PERSONALNUMBER`).
- **E-mail**: Para envio de e-mails, utilize o Amazon SES (Simple Email Service) da AWS. As credenciais necessárias são `AWS_ACCESS_KEY`, `AWS_SECRET_ACCESS_KEY`, `AWS_REGION`, e `AWS_API_VERSION`.

### Instalação

1. **Clone este repositório:**

   ```bash
   git clone https://github.com/seu-usuario/seu-repositorio.git
   ```

2. **Instale as dependências:**

   ```bash
   npm install
   ```

3. **Inicie a aplicação em modo de desenvolvimento:**

   ```bash
   npm run dev
   ```

4. **Gere o build da aplicação:**

   ```bash
   npm run build
   ```

5. **Inicie a aplicação build:**

   ```bash
   npm run start
   ```

## Contribuição

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests para melhorias.

## Licença

Este projeto está licenciado sob a [MIT License](LICENSE).
