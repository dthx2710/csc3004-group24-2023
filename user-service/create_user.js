const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'password';

bcrypt.hash(myPlaintextPassword, saltRounds, async function(err, hash) {
  const user = await prisma.users.create({
    data: {
      id: '9',
      username: 'admin2',
      password: hash,
      user_type: 'admin',
      constituency_id: '2',
    }
  })
});

// id: '1',
// username: '',
// password: '',
// user_type: '',
// constituency_id: '',