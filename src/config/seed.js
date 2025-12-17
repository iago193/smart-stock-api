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
