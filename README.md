# 📌 Job Application Tracker

Um tracker de candidaturas de emprego estilo Kanban, onde você pode organizar suas vagas, acompanhar progresso e nunca mais se perder no meio dos processos seletivos.

## ✨ Features
- 🧱 Board estilo Kanban (arrastar e soltar)
- ➕ Criar e deletar colunas (ex: “Aplicado”, “Entrevista”, “Oferta”)
- 📝 Criar, editar e remover vagas
- 🔀 Mover vagas entre colunas (drag & drop)
- 🔐 Autenticação (criar conta / login)
- 🚀 Colunas iniciais já criadas automaticamente ao registrar
- 💾 Persistência de dados com banco PostgreSQL
- 🛠️ Tech Stack

## Frontend
- Next.js 16
- React 19
- TailwindCSS
- shadcn/ui
- Radix UI

## Backend
- Next.js (API Routes / Server Actions)
- Prisma ORM
- PostgreSQL
  
## Outros
- DnD Kit (drag and drop)
- React Hook Form
- Zod (validação)
- Better Auth (autenticação)
  
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
DATABASE_URL="postgresql://user:password@localhost:5432/database"
```

```bash
BETTER_AUTH_SECRET=better-auth-secret
BETTER_AUTH_URL=http://localhost:3000
```

```bash
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



## Link pra vercel

```bash
https://job-application-tracker-nu-three.vercel.app/
```
