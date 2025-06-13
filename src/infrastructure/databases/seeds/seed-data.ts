import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

dotenv.config({
  path: '.env.development',
});

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

async function seed() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const userIds: number[] = [];
    const usedEmails = new Set<string>();

    console.log('Seeding 500 users...');
    while (userIds.length < 500) {
      let email: string;

      do {
        email = faker.internet.email();
      } while (usedEmails.has(email));

      usedEmails.add(email);

      const name = faker.person.fullName();
      const password = await bcrypt.hash('password123', 10);

      const userResult = await queryRunner.query(
        `INSERT INTO users (email, name, password) VALUES ($1, $2, $3) RETURNING id`,
        [email, name, password],
      );
      userIds.push(userResult[0].id);
    }

    console.log('Seeding 500 posts...');
    for (let i = 0; i < 500; i++) {
      const randomUserId = userIds[Math.floor(Math.random() * userIds.length)];
      const content = faker.lorem.sentence();
      await queryRunner.query(
        `INSERT INTO posts (user_id, content) VALUES ($1, $2)`,
        [randomUserId, content],
      );
    }

    console.log('Seeding 500 friendships...');
    const friendshipsSet = new Set<string>();
    while (friendshipsSet.size < 500) {
      const requester = userIds[Math.floor(Math.random() * userIds.length)];
      const addressee = userIds[Math.floor(Math.random() * userIds.length)];

      if (requester !== addressee) {
        const key = `${requester}_${addressee}`;
        if (!friendshipsSet.has(key)) {
          friendshipsSet.add(key);
          await queryRunner.query(
            `INSERT INTO friendships (requester_id, addressee_id, status) VALUES ($1, $2, $3)`,
            [requester, addressee, 'pending'],
          );
        }
      }
    }

    await queryRunner.commitTransaction();
    console.log('✅ Seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seed();
