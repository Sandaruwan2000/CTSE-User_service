/**
 * PothaGedara.lk - User Seeder
 * Seeds the database with sample users including 1 admin and 5 customers.
 *
 * Usage:
 *   node seeders/userSeeder.js           -> import (seed) users
 *   node seeders/userSeeder.js --destroy -> wipe all users from DB
 */

require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');

// Sample Data

const sampleUsers = [
  {
    name: 'Admin PothaGedara',
    email: 'admin@pothagedara.lk',
    password: 'Admin@123',
    role: 'admin',
  },
  {
    name: 'Kasun Perera',
    email: 'kasun@example.com',
    password: 'Test@123',
    role: 'user',
  },
  {
    name: 'Nimal Silva',
    email: 'nimal@example.com',
    password: 'Test@123',
    role: 'user',
  },
  {
    name: 'Sanduni Fernando',
    email: 'sanduni@example.com',
    password: 'Test@123',
    role: 'user',
  },
  {
    name: 'Ruwan Jayasinghe',
    email: 'ruwan@example.com',
    password: 'Test@123',
    role: 'user',
  },
  {
    name: 'Dilani Wickramasinghe',
    email: 'dilani@example.com',
    password: 'Test@123',
    role: 'user',
  },
];

// Helpers

const connectDB = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`MongoDB Connected: ${mongoose.connection.host}`);
};

const importData = async () => {
  try {
    await connectDB();

    // The seeder uses create() so model hooks still run.
    console.log('\nSeeding users...\n');

    let created = 0;
    let skipped = 0;

    for (const userData of sampleUsers) {
      const exists = await User.findOne({ email: userData.email });
      if (exists) {
        console.log(`  Skipped (already exists): ${userData.email}`);
        skipped++;
        continue;
      }

      await User.create(userData);
      console.log(`  Created [${userData.role.padEnd(5)}] ${userData.name} <${userData.email}>`);
      created++;
    }

    console.log(`\nSummary: ${created} created, ${skipped} skipped`);
    console.log('\nLogin credentials:');
    console.log('  Admin :  admin@pothagedara.lk  /  Admin@123');
    console.log('  Users :  kasun@example.com     /  Test@123');
    console.log('           (same password for all sample users)\n');

    process.exit(0);
  } catch (error) {
    console.error('Seeder Error:', error.message);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await connectDB();
    const result = await User.deleteMany({});
    console.log(`\nDeleted ${result.deletedCount} user(s) from the database.\n`);
    process.exit(0);
  } catch (error) {
    console.error('Destroy Error:', error.message);
    process.exit(1);
  }
};

// Entry Point

if (process.argv[2] === '--destroy') {
  destroyData();
} else {
  importData();
}
