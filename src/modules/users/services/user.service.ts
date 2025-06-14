import { Inject, Injectable } from '@nestjs/common';
import { IUserRepository } from '../repositories/user.repository.interface';

@Injectable()
export class UserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepo: IUserRepository,
  ) {}

  async createUser(data: any) {
    return this.userRepo.createUser(data);
  }

  async updateUser(data: any) {
    return this.userRepo.findByEmail(data);
  }

  async findUserById(id: number) {
    return this.userRepo.findById(id);
  }
  async findAllUsers() {
    return this.userRepo.findAll();
  }
}
