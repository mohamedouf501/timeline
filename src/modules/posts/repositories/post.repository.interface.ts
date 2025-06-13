import { PostEntity } from '../entities/post.entity';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';

export interface IPostRepository {
  createPost(data: CreatePostDto): Promise<PostEntity>;
  updatePost(data: UpdatePostDto): Promise<void>;
}
