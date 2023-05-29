const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');

async function main() {
  const prisma = new PrismaClient()
  const user = await prisma.users.findFirst({
    where: {
        username: 'John Lim'
    },
  })
  console.log(user)
  myPlaintextPassword = 'password'
  bcrypt.compare(myPlaintextPassword, user.password, function(err, result) {
    console.log(result)
});
  await prisma.$disconnect()
}

main()