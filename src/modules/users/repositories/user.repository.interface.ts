import { UserEntity } from '../entities/user.entity';

export interface IUserRepository {
  createUser(data: Partial<UserEntity>): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: number): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
}
