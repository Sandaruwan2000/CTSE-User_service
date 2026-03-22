const User = require('../models/User');

const defaultUsers = [
  {
    name: process.env.DEFAULT_ADMIN_NAME || 'Admin PothaGedara',
    email: process.env.DEFAULT_ADMIN_EMAIL || 'admin@pothagedara.lk',
    password: process.env.DEFAULT_ADMIN_PASSWORD || 'Admin@123',
    role: 'admin',
  },
  {
    name: process.env.DEFAULT_USER_NAME || 'Kasun Perera',
    email: process.env.DEFAULT_USER_EMAIL || 'kasun@example.com',
    password: process.env.DEFAULT_USER_PASSWORD || 'Test@123',
    role: 'user',
  },
];

const seedDefaultUsers = async () => {
  const userCount = await User.countDocuments();

  if (userCount > 0) {
    return;
  }

  await User.create(defaultUsers);
  console.log('Bootstrapped default users for local development.');
};

module.exports = { seedDefaultUsers };
