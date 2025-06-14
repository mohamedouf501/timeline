import { DataSource } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { faker } from '@faker-js/faker';
import * as dotenv from 'dotenv';

if (process.env.NODE_ENV === 'development') {
  dotenv.config();
}

const BATCH_SIZE = 500;

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
});

function now() {
  return new Date();
}

function chunkArray<T>(array: T[], chunkSize: number): T[][] {
  const results: T[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    results.push(array.slice(i, i + chunkSize));
  }
  return results;
}

function logStep(title: string) {
  console.log(`\n📍 ${title}`);
}

async function seed() {
  await AppDataSource.initialize();
  const queryRunner = AppDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const usedEmails = new Set<string>();
    const userIds: number[] = [];
    const users: any[] = [];

    logStep('Generating 500 users...');
    for (let i = 0; i < 500; i++) {
      let email: string;
      do {
        email = faker.internet.email();
      } while (usedEmails.has(email));
      usedEmails.add(email);

      const name = faker.person.fullName();
      const password = await bcrypt.hash('password123', 10);
      const createdAt = now();

      users.push([email, name, password, createdAt, createdAt]);
    }

    logStep('Inserting users in batches...');
    let batchNum = 1;
    for (const chunk of chunkArray(users, BATCH_SIZE)) {
      const values = chunk.map(
        (_, i) =>
          `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`,
      );
      const params = chunk.flat();
      const inserted = await queryRunner.query(
        `INSERT INTO users (email, name, password, created_at, updated_at) VALUES ${values.join(',')} RETURNING id`,
        params,
      );
      userIds.push(...inserted.map((u: any) => u.id));
      console.log(`✅ Inserted batch ${batchNum++} - ${chunk.length} users`);
    }

    console.log(`🟢 Total users inserted: ${userIds.length}`);

    logStep('Seeding 1000 posts per user...');
    let totalPosts = 0;
    for (const [index, userId] of userIds.entries()) {
      const postChunks = [];
      const nowDate = now();
      for (let i = 0; i < 1000; i++) {
        const content = faker.lorem.sentence();
        postChunks.push([userId, content, nowDate, nowDate]);
      }

      for (const [chunkIndex, chunk] of chunkArray(
        postChunks,
        BATCH_SIZE,
      ).entries()) {
        const values = chunk.map(
          (_, i) =>
            `($${i * 4 + 1}, $${i * 4 + 2}, $${i * 4 + 3}, $${i * 4 + 4})`,
        );
        const params = chunk.flat();
        await queryRunner.query(
          `INSERT INTO posts (user_id, content, created_at, updated_at) VALUES ${values.join(',')}`,
          params,
        );
        totalPosts += chunk.length;
        if ((chunkIndex + 1) % 5 === 0 || chunkIndex === 0) {
          console.log(
            `User ${index + 1}/${userIds.length} – Batch ${chunkIndex + 1} done`,
          );
        }
      }
    }
    console.log(`🟢 Total posts inserted: ${totalPosts}`);

    logStep('Seeding 1000 friendships per user...');
    const friendshipSet = new Set<string>();
    const friendships: any[] = [];
    const nowDate = now();

    for (const [index, requesterId] of userIds.entries()) {
      let count = 0;
      while (count < 1000) {
        const addresseeId = userIds[Math.floor(Math.random() * userIds.length)];
        const key = `${requesterId}_${addresseeId}`;
        const reverseKey = `${addresseeId}_${requesterId}`;
        if (
          requesterId !== addresseeId &&
          !friendshipSet.has(key) &&
          !friendshipSet.has(reverseKey)
        ) {
          friendshipSet.add(key);
          friendships.push([
            requesterId,
            addresseeId,
            'accepted',
            nowDate,
            nowDate,
          ]);
          count++;
        }
      }
      if ((index + 1) % 25 === 0) {
        console.log(
          `Processed friendships for ${index + 1}/${userIds.length} users`,
        );
      }
    }

    logStep('Inserting friendships in batches...');
    let friendshipsInserted = 0;
    for (const [chunkIndex, chunk] of chunkArray(
      friendships,
      BATCH_SIZE,
    ).entries()) {
      const values = chunk.map(
        (_, i) =>
          `($${i * 5 + 1}, $${i * 5 + 2}, $${i * 5 + 3}, $${i * 5 + 4}, $${i * 5 + 5})`,
      );
      const params = chunk.flat();
      await queryRunner.query(
        `INSERT INTO friendships (requester_id, addressee_id, status, created_at, updated_at) VALUES ${values.join(',')}`,
        params,
      );
      friendshipsInserted += chunk.length;
      if ((chunkIndex + 1) % 10 === 0) {
        console.log(`✅ Inserted ${chunkIndex + 1} batches`);
      }
    }

    console.log(`🟢 Total friendships inserted: ${friendshipsInserted}`);

    await queryRunner.commitTransaction();
    console.log('\n✅✅✅ All seeding complete!');
  } catch (err) {
    console.error('❌ Seeding failed:', err);
    await queryRunner.rollbackTransaction();
  } finally {
    await queryRunner.release();
    await AppDataSource.destroy();
  }
}

seed();
