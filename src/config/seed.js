import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  const roles = [
    { name: 'owner', description: 'Acesso total ao sistema' },
    { name: 'manager', description: 'Gerencia produtos e usuários, mas sem acesso total' },
    { name: 'box', description: 'Acesso ao módulo de vendas' },
    { name: 'stock', description: 'Gerencia entradas e saídas de estoque' },
  ];

  for (const role of roles) {
    await prisma.role.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }

  console.log('✔ Roles inseridos com sucesso!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(err => {
    console.error(err);
    prisma.$disconnect();
    process.exit(1);
  });

//npx prisma db seed

//SQL PURO
//password do admin: admin123
/*
INSERT INTO users (
  first_name,
  last_name,
  email,
  password_hash,
  role_id,
  created_at,
  updated_at
) VALUES (
  'Admin',
  'Sistema',
  'admin@admin.com',
  '$2a$10$e0NMVRBzG0cSi0UIqgupr.PR6A93yyjQKQlzZdWa9yQ3PDss6dzn.',
  1,
  NOW(),
  NOW()
);
*/
