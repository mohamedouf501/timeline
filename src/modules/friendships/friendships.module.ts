import { Module } from '@nestjs/common';
import { FriendshipController } from './controllers/friendship/friendship.controller';
import { FriendshipService } from './services/friendship/friendship.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FriendshipEntity } from './entities/friendship.entity';
import { FriendshipRepository } from './repositories/friendship.repository';

@Module({
  imports: [TypeOrmModule.forFeature([FriendshipEntity])],
  controllers: [FriendshipController],
  providers: [
    FriendshipService,
    {
      provide: 'IFriendshipRepository',
      useClass: FriendshipRepository,
    },
  ],
})
export class FriendshipsModule {}
