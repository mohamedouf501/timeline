import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { FriendshipEntity } from '../../friendships/entities/friendship.entity';
import { PostEntity } from '../../posts/entities/post.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.requester)
  sentFriendRequests: FriendshipEntity[];

  @OneToMany(() => FriendshipEntity, (friendship) => friendship.addressee)
  receivedFriendRequests: FriendshipEntity[];

  @OneToMany(() => PostEntity, (post) => post.user)
  posts: PostEntity[];
}
