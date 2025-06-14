import { Controller, Post, Patch, Body } from '@nestjs/common';
import { RespondFriendRequestDto } from '../dtos/respond-friend-request.dto';
import { SendFriendRequestDto } from '../dtos/send-friend-request.dto';
import { FriendshipService } from '../services/friendship.service';

@Controller('friendships')
export class FriendshipController {
  constructor(private readonly friendshipService: FriendshipService) {}

  @Post()
  sendRequest(@Body() dto: SendFriendRequestDto) {
    return this.friendshipService.sendRequest(dto);
  }

  @Patch()
  respond(@Body() dto: RespondFriendRequestDto) {
    return this.friendshipService.respondToRequest(dto);
  }
}
