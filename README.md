# 📌 Job Application Tracker

Aplicação fullstack estilo Kanban para organizar candidaturas de emprego e acompanhar o progresso em processos seletivos.

## ✨ Funcionalidades

- Board estilo Kanban com drag & drop
- Criação e remoção de colunas (ex: Aplicado, Entrevista, Oferta)
- Criação, edição e remoção de vagas
- Movimentação de vagas entre colunas
- Autenticação de usuários
- Colunas iniciais criadas automaticamente ao registrar
- Persistência com PostgreSQL

## 🛠️ Tecnologias

### Frontend
- Next.js
- React
- TailwindCSS
- shadcn/ui
- Radix UI

### Backend
- Next.js (API Routes / Server Actions)
- Prisma ORM
- PostgreSQL

### Outros
- DnD Kit
- React Hook Form
- Zod
- Better Auth
  
## 📦 Instalação

### Clone o repositório

```bash
git clone git@github.com:Rafhael-Augusto/job-application-tracker.git
```

 Entre na pasta
 
```bash 
cd job-application-tracker
```

Instale as dependências

```bash
npm install
```

## ⚙️ Configuração

Crie um arquivo .env na raiz do projeto:

```bash
BETTER_AUTH_SECRET=better-auth-secret
BETTER_AUTH_URL=http://localhost:3000

DATABASE_URL="data-base-url"
```

Depois rode:

```bash
npx prisma generate
npx prisma migrate dev
```

## 🚀 Rodando o projeto

```bash
npm run dev
```

Acesse em:

```bash
http://localhost:3000
```



## Deploy

https://job-application-tracker-nu-three.vercel.app/
