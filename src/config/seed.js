import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // ---- ROLES ----
  const roles = [
    {
      name: 'dono',
      description: 'Acesso total ao sistema',
    },
    {
      name: 'gerente',
      description: 'Gerencia produtos e usuários, mas sem acesso total',
    },
    {
      name: 'caixa',
      description: 'Acesso ao módulo de vendas',
    },
    {
      name: 'estoque',
      description: 'Gerencia entradas e saídas de estoque',
    },
  ];

  for (const role of roles) {
    await prisma.roles.upsert({
      where: { name: role.name },
      update: {},
      create: role,
    });
  }
  console.log('✔ Roles inseridos com sucesso!');
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e);
    prisma.$disconnect();
    process.exit(1);
  });
