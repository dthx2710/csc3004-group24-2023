const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 'password';


const createUser = async () => {
  try {
    // Generate the hashed password
    const hashedPassword = await bcrypt.hash(myPlaintextPassword, saltRounds);

    // Create the user entry with the hashed password
    const user = await prisma.users.create({
      data: {
        username: 'Dolicon',
        password: hashedPassword,
        user_type: 'user',
        constituency_id: '2',
      },
    });

    // Generate the hashed user ID
    const hashedUserID = await bcrypt.hash(user.user_id, saltRounds);

    // Update the user record with the hashed user ID
    await prisma.users.update({
      where: { user_id: user.user_id },
      data: { hash_id: hashedUserID },
    });

    console.log('User created with hashed password and hashed user ID successfully.');
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
};

createUser();