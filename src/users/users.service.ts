import { Injectable } from '@nestjs/common';
import { db } from '../db';
import { NewUser, users } from '../db/schema';
import { eq } from 'drizzle-orm';

@Injectable()
export class UsersService {
  async findByVerificationToken(token: string) {
    return await db.query.users.findFirst({
      where: eq(users.verificationToken, token),
    });
  }
  async findByResetToken(token: string) {
    return await db.query.users.findFirst({
      where: eq(users.resetToken, token),
    });
  }

  async findAll() {
    return db.query.users.findMany();
  }

  async findByEmail(email: string) {
    return await db.query.users.findFirst({
      where: eq(users.email, email),
    });
  }

  async findById(id: string) {
    return await db.query.users.findFirst({
      where: eq(users.id, id),
    });
  }
  async create(data: NewUser) {
    const [user] = await db.insert(users).values(data).returning();
    return user;
  }

  // Partial makes all insert fields optional, so we can update only the fields we need.
  async update(id: string, data: Partial<typeof users.$inferInsert>) {
    const [user] = await db
      .update(users)
      .set({ ...data, updatedAt: new Date() })
      .where(eq(users.id, id))
      .returning();

    return user;
  }

  async delete(id: string) {
    await db.delete(users).where(eq(users.id, id));
  }
}
