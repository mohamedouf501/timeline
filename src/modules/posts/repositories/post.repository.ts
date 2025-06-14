import { Injectable } from '@nestjs/common';
import { IPostRepository } from './post.repository.interface';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { PostEntity } from '../entities/post.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FriendshipStatus } from '../../friendships/entities/friendship.entity';

@Injectable()
export class PostRepository implements IPostRepository {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  async createPost(data: CreatePostDto): Promise<PostEntity> {
    const post = this.postRepository.create(data);
    return this.postRepository.save(post);
  }

  async updatePost(data: UpdatePostDto): Promise<void> {
    console.log('Post updated:', data);
  }
  async getUserTimeline(
    userId: number,
    limit: number,
    page: number,
  ): Promise<PostEntity[]> {
    const posts = await this.postRepository.query(
      `
      SELECT p.*
      FROM posts p
      WHERE p.user_id = $1
      OR p.user_id IN (
        SELECT 
          CASE
            WHEN f.requester_id = $1 THEN f.addressee_id
            WHEN f.addressee_id = $1 THEN f.requester_id
          END
        FROM friendships f
        WHERE f.status = $2
      )
      ORDER BY p.created_at DESC
      LIMIT $3 OFFSET $4
      `,
      [userId, FriendshipStatus.ACCEPTED, limit, (page - 1) * limit],
    );

    return posts.map((post: Record<string, any>): PostEntity => {
      return {
        id: post.id,
        content: post.content,
        created_at: post.created_at,
        updated_at: post.updated_at,
        user: post.user_id,
        createdAt: new Date(post.created_at),
        updatedAt: new Date(post.updated_at),
      } as PostEntity;
    });
  }
}
