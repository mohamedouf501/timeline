import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { UserEntity } from '../../users/entities/user.entity';

export enum FriendshipStatus {
  PENDING = 'pending',
  ACCEPTED = 'accepted',
  REJECTED = 'rejected',
}

@Entity('friendships')
export class FriendshipEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  requesterId: number;

  @Column()
  addresseeId: number;

  @Column({
    type: 'enum',
    enum: FriendshipStatus,
  })
  status: FriendshipStatus;

  @ManyToOne(() => UserEntity, (user) => user.sentFriendRequests)
  requester: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.receivedFriendRequests)
  addressee: UserEntity;
}
