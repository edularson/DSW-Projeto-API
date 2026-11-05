# API de vendas

API REST acadêmica para gerenciamento de produtos, clientes e pedidos, com cadastro de usuários, autenticação JWT e recuperação de senha.

## Tecnologias e organização

TypeScript, Node.js, Express, TypeORM 0.2, PostgreSQL, Celebrate/Joi, bcryptjs e Nodemailer.

O código é dividido em módulos de domínio. As rotas encaminham requisições aos controllers; os services implementam as operações; os repositories e as entidades concentram o acesso aos dados. As migrations estão em `src/shared/typeorm/migrations`.

## Execução local

1. Clone o projeto e instale as dependências:

```bash
git clone https://github.com/edularson/DSW-Projeto-API.git
cd DSW-Projeto-API
npm install
```

2. Crie uma base PostgreSQL chamada `apivendas` e habilite a extensão usada pelos identificadores:

```sql
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
```

3. Ajuste `ormconfig.json` para seu banco local. Revise também a configuração de autenticação em `src/config/auth.ts` e de e-mail em `src/config/mail`.

4. Aplique as migrations e inicie a API:

```bash
npm run typeorm -- migration:run
npm run dev
```

A API utiliza `http://localhost:3333`.

### Pendência conhecida para banco vazio

O histórico atual contém uma migration que referencia a tabela `customers`, mas não contém a migration que cria essa tabela. Portanto, o comando de migrations ainda não reproduz integralmente a base em um banco vazio. Essa lacuna precisa ser corrigida antes de considerar a instalação reproduzível; não habilite sincronização automática como substituto.

## Principais rotas

| Recurso | Rotas | Autenticação |
| --- | --- | --- |
| Usuários | `POST /users`, `GET /users`, `PATCH /users/avatar` | Cadastro público; demais operações protegidas |
| Sessões | `POST /sessions` | Pública |
| Produtos | `GET`, `POST /products`; `GET`, `PUT`, `DELETE /products/:id` | JWT |
| Clientes | `GET`, `POST /customers`; `GET`, `PUT`, `DELETE /customers/:id` | JWT |
| Pedidos | `GET`, `POST /orders`; `GET /orders/:id` | JWT |
| Perfil e senha | Consulte as rotas em `src/modules/users/routes` | Conforme a operação |

Nas rotas protegidas, envie o cabeçalho `Authorization: Bearer SEU_TOKEN`.

## Exemplo de uso

Cadastre um usuário:

```bash
curl -X POST http://localhost:3333/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"Usuario Demo","email":"demo@example.com","password":"senha-demo-local"}'
```

Autentique-se:

```bash
curl -X POST http://localhost:3333/sessions \
  -H 'Content-Type: application/json' \
  -d '{"email":"demo@example.com","password":"senha-demo-local"}'
```

Use o token retornado para cadastrar produtos e clientes. Para criar um pedido, envie a `POST /orders`:

```json
{
  "customer_id": "UUID_DO_CLIENTE",
  "products": [
    { "id": "UUID_DO_PRODUTO", "quantity": 2 }
  ]
}
```

## Próximos passos técnicos

- Completar e validar as migrations em banco vazio.
- Garantir atomicidade na criação de pedidos e na atualização do estoque, incluindo concorrência.
- Adicionar testes de integração para autenticação, validação e pedidos.
- Documentar os contratos completos das rotas com OpenAPI.

## Autor

[Eduardo Larson](https://github.com/edularson)
