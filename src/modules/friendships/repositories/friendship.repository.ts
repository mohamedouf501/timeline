import { Injectable } from '@nestjs/common';
import { IFriendshipRepository } from './friendship.repository.interface';
import {
  FriendshipStatus,
  FriendshipEntity,
} from '../entities/friendship.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FriendshipRepository
  extends Repository<FriendshipEntity>
  implements IFriendshipRepository
{
  async createFriendship(
    requesterId: number,
    addresseeId: number,
  ): Promise<FriendshipEntity> {
    // Simulate creating a friendship
    const friendship = new FriendshipEntity();
    friendship.requesterId = requesterId;
    friendship.addresseeId = addresseeId;
    friendship.status = FriendshipStatus.PENDING;

    console.log(
      `Creating friendship from user ${requesterId} to user ${addresseeId}`,
    );
    return Promise.resolve(friendship);
  }

  async updateStatus(
    friendshipId: number,
    status: FriendshipStatus,
  ): Promise<void> {
    // Simulate updating the status of a friendship
    console.log(
      `Updating friendship ${friendshipId} to status ${FriendshipStatus[status]}`,
    );
    return Promise.resolve();
  }
}
