import { FriendshipStatus } from '../entities/friendship.entity';
export class RespondFriendRequestDto {
  friendshipId: number;
  status: FriendshipStatus;
}
