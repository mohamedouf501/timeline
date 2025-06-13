import { Inject, Injectable } from '@nestjs/common';
import { SendFriendRequestDto } from '../../dtos/send-friend-request.dto';
import { RespondFriendRequestDto } from '../../dtos/respond-friend-request.dto';
import { IFriendshipRepository } from '../../repositories/friendship.repository.interface';

@Injectable()
export class FriendshipService {
  constructor(
    @Inject('IFriendshipRepository')
    private readonly friendshipRepo: IFriendshipRepository,
  ) {}

  async sendRequest(dto: SendFriendRequestDto) {
    return this.friendshipRepo.createFriendship(
      dto.requesterId,
      dto.addresseeId,
    );
  }

  async respondToRequest(dto: RespondFriendRequestDto) {
    await this.friendshipRepo.updateStatus(dto.friendshipId, dto.status);
  }
}
