import { Injectable } from '@nestjs/common';
import { IPostRepository } from './post.repository.interface';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PostRepository
  extends Repository<PostEntity>
  implements IPostRepository
{
  async createPost(data: CreatePostDto): Promise<PostEntity> {
    return { id: 1, ...data, createdAt: new Date() };
  }

  async updatePost(data: UpdatePostDto): Promise<void> {
    // implement update logic
    console.log('Post updated:', data);
  }
}
