import { Inject, Injectable } from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { IPostRepository } from '../repositories/post.repository.interface';

@Injectable()
export class PostService {
  constructor(
    @Inject('IPostRepository')
    private readonly postRepo: IPostRepository,
  ) {}

  async create(dto: CreatePostDto) {
    return this.postRepo.createPost(dto);
  }

  async update(dto: UpdatePostDto) {
    await this.postRepo.updatePost(dto);
  }
  async getUserTimeline(userId: number, limit: number, page: number) {
    return this.postRepo.getUserTimeline(userId, limit, page);
  }
}
