import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entities/user.entity';
import { IUserRepository } from './user.repository.interface';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repo: Repository<UserEntity>,
  ) {}

  async createUser(data: Partial<UserEntity>): Promise<UserEntity> {
    const user = this.repo.create(data);
    return this.repo.save(user);
  }

  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { email },
      select: ['id', 'email', 'name'],
    });
  }

  async findById(id: number): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: { id },
      select: ['id', 'email', 'name'],
    });
  }
  async findAll(): Promise<UserEntity[]> {
    return this.repo.find({
      select: ['id', 'email', 'name'],
      relations: ['posts'],
    });
  }
}
