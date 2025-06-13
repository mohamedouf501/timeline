import { FriendshipRepository } from './friendship.repository';

describe('FriendshipRepository', () => {
  it('should be defined', () => {
    expect(new FriendshipRepository()).toBeDefined();
  });
});
