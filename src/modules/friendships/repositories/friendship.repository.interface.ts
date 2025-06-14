import {
  FriendshipEntity,
  FriendshipStatus,
} from '../entities/friendship.entity';

export interface IFriendshipRepository {
  createFriendship(
    requesterId: number,
    addresseeId: number,
  ): Promise<FriendshipEntity>;
  updateStatus(friendshipId: number, status: FriendshipStatus): Promise<void>;
}
