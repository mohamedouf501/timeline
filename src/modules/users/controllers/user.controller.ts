import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { CreateUserDto } from '../dtos/create-user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() dto: CreateUserDto) {
    return this.userService.createUser(dto);
  }

  @Get()
  async findAll() {
    return this.userService.findAllUsers();
  }
  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.userService.findUserById(+id);
  }
}
