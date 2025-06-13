import { Controller, Post as HttpPost, Patch, Body } from '@nestjs/common';
import { CreatePostDto } from '../../dtos/create-post.dto';
import { UpdatePostDto } from '../../dtos/update-post.dto';
import { PostService } from '../../services/post/post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  create(@Body() dto: CreatePostDto) {
    return this.postService.create(dto);
  }

  @Patch()
  update(@Body() dto: UpdatePostDto) {
    return this.postService.update(dto);
  }
}
