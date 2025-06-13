import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
