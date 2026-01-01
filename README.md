### 🚀 Smart Stock API - Sistema Completo de Gestão de Estoque

Desenvolvi uma **API REST robusta e escalável** para gestão de estoque e produtos, utilizando Node.js e Express. Esta solução oferece controle completo sobre inventário, produtos, categorias e usuários, com foco em segurança, performance e boas práticas de desenvolvimento.

#### 🎯 Funcionalidades Principais

**📦 Gestão de Produtos**

- CRUD completo (Create, Read, Update, Delete) de produtos
- Controle de estoque em tempo real
- Sistema de categorias para organização hierárquica
- Upload e gerenciamento de múltiplas imagens por produto via Cloudinary
- Campos detalhados: SKU único, código de barras, preços (normal e com desconto), dimensões (largura, altura, comprimento), peso
- Controle de status (ativo/inativo)

**🔐 Sistema de Autenticação e Autorização**

- Autenticação baseada em JWT (JSON Web Tokens)
- Sistema de roles e permissões para controle de acesso
- Hash seguro de senhas utilizando Bcrypt
- Middleware de autenticação para proteção de rotas sensíveis
- Endpoints protegidos para operações administrativas

**🛡️ Segurança e Proteção**

- Rate limiting implementado com Express Rate Limit para prevenir abuso
- Validação rigorosa de dados de entrada utilizando Zod schemas
- Tratamento centralizado de erros com classes customizadas
- Validação de tipos MIME para uploads de arquivos
- Proteção contra SQL injection através do Prisma ORM

**📊 Arquitetura e Organização**

- Padrão MVC (Model-View-Controller) para separação de responsabilidades
- Estrutura modular: Controllers, Services, Routes, Middlewares, Schemas
- Formatters para padronização de dados de resposta
- Error handling centralizado com classes ApiError e ErrorHandler
- Configuração de seed para inicialização do banco de dados

#### 🛠️ Stack Tecnológica

**Backend:**

- Node.js (ES Modules)
- Express.js 5.1.0
- Prisma ORM 6.19.0
- MySQL Database

**Autenticação e Segurança:**

- JSON Web Tokens (JWT)
- Bcrypt para hash de senhas
- Express Rate Limit

**Validação e Upload:**

- Zod para validação de schemas
- Multer para upload de arquivos
- Cloudinary para armazenamento de imagens
- Mime-types para validação de arquivos

**Desenvolvimento:**

- ESLint para linting
- Prettier para formatação
- Nodemon para desenvolvimento

#### 🏗️ Estrutura do Projeto

```
smart-stock-api/
├── src/
│   ├── controllers/    # Lógica de controle das requisições
│   ├── services/       # Lógica de negócio
│   ├── routes/         # Definição de rotas
│   ├── middlewares/    # Autenticação, rate limiting, upload
│   ├── schemas/        # Validação com Zod
│   ├── formatters/     # Formatação de dados de resposta
│   ├── errors/         # Tratamento de erros
│   ├── lib/            # Configurações (Prisma, Cloudinary)
│   └── utils/          # Utilitários (geração de tokens)
├── prisma/             # Schema e migrações do banco
└── server.js           # Ponto de entrada da aplicação
```

#### ✨ Destaques Técnicos

- **Arquitetura escalável**: Separação clara de responsabilidades facilita manutenção e expansão
- **Segurança em camadas**: Autenticação JWT + Rate Limiting + Validação de dados
- **ORM moderno**: Prisma oferece type-safety e migrations automáticas
- **Tratamento de erros robusto**: Sistema centralizado de erros com mensagens padronizadas
- **Código limpo**: Seguindo princípios SOLID e boas práticas de desenvolvimento

#### 🎓 Aprendizados e Práticas

Este projeto demonstra conhecimento em:

- Desenvolvimento de APIs RESTful
- Autenticação e autorização com JWT
- Integração com serviços de terceiros (Cloudinary)
- Validação e sanitização de dados
- Segurança de aplicações web
- Arquitetura de software escalável
- ORM e gerenciamento de banco de dados
