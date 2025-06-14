# [1.5.0](https://github.com/mohamedouf501/timeline/compare/v1.4.0...v1.5.0) (2025-06-14)

### Features

- add configuration and environment setup for database connection ([50b8914](https://github.com/mohamedouf501/timeline/commit/50b89149a1b1ba050fd904f8ef189edf240ea72b))
- add database module and TypeORM configuration for PostgreSQL ([803eb42](https://github.com/mohamedouf501/timeline/commit/803eb425e11474c5a1ddfda7eb08af3e67794257))
- add initial docker-compose configuration for PostgreSQL service ([0e307b4](https://github.com/mohamedouf501/timeline/commit/0e307b46b386e5b96950bbed27909d6e65253781))
- add PostService with create and update methods for managing posts ([13c511c](https://github.com/mohamedouf501/timeline/commit/13c511ca4d1fb61d7fd6cf267de3cc9ce2ed5e4d))
- add seed script for populating users, posts, and friendships in the database ([b0b4f03](https://github.com/mohamedouf501/timeline/commit/b0b4f035e861c2636e3759005e2428d67d324547))
- add UsersModule, PostsModule, and FriendshipsModule to AppModule imports ([f95f3e3](https://github.com/mohamedouf501/timeline/commit/f95f3e334459bcf5df116db4b12f2f6d1c0d56e5))
- configure application to use environment variables for port settings ([1161307](https://github.com/mohamedouf501/timeline/commit/11613075421a63e11ff7d41d9f98ea11f459dece))
- create timeline, posts, and friendships tables with migration scripts ([6b8a421](https://github.com/mohamedouf501/timeline/commit/6b8a421024ef5ba31808d26b971ac01f5c802eb0))
- enhance User module with CRUD operations and service tests ([967080e](https://github.com/mohamedouf501/timeline/commit/967080e2f816330b84d5a3dbf8b4200a3837f88c))
- implement FriendshipController and FriendshipService with basic functionality ([7202408](https://github.com/mohamedouf501/timeline/commit/7202408f142aa1952e48b7f97f1bdc965e37ad87))
- implement friendships module with controller, service, repository, DTOs, and tests ([c3092ce](https://github.com/mohamedouf501/timeline/commit/c3092ce0c2d599ec1e25e46869e13c43263206dc))
- implement PostController, PostService, and PostRepository with CRUD functionality ([2bac40d](https://github.com/mohamedouf501/timeline/commit/2bac40d00d975285bf282ef7a26c393cf27c0abc))
- implement posts module with controller, service, repository, DTOs, and tests ([5800150](https://github.com/mohamedouf501/timeline/commit/58001509612c93fef860e81a81bf01e45542c317))
- implement user module with controller, service, repository, and DTOs ([63a0bff](https://github.com/mohamedouf501/timeline/commit/63a0bff18472aeea659417c1061ae3e4a502b7f4))
- optimize seed script for batch processing of users, posts, and friendships ([e1527d7](https://github.com/mohamedouf501/timeline/commit/e1527d7d8abc9e86a202b2045de9e1ea44182ac4))
- remove legacy seed data script for users, posts, and friendships ([84e178a](https://github.com/mohamedouf501/timeline/commit/84e178a872802e86ad3391f2f44b03c5ed1db08d))
- update entity relationships for friendships and posts in UserEntity and FriendshipEntity ([e79ef82](https://github.com/mohamedouf501/timeline/commit/e79ef822711153272f2f924aa4fc0aaea4b7b149))

# [1.4.0](https://github.com/mohamedouf501/timeline/compare/v1.3.0...v1.4.0) (2025-06-14)

### Features

- refactor commit-analyzer plugin configuration for clarity ([52a7e2e](https://github.com/mohamedouf501/timeline/commit/52a7e2eadf23899e17a8cd57afd706948bb3071b))

# [1.3.0](https://github.com/mohamedouf501/timeline/compare/v1.2.0...v1.3.0) (2025-06-09)

### Features

- add support for skipping commitlint on semantic-release commits ([93c7db6](https://github.com/mohamedouf501/timeline/commit/93c7db65e3dbebbc2f5eeb48d79b98f762cb19e6))
- update dependabot configuration for npm and improve commit message checks ([bc0cbe0](https://github.com/mohamedouf501/timeline/commit/bc0cbe04e533d989f6a128f6710711f31f1a693d))

# [1.2.0](https://github.com/mohamedouf501/timeline/compare/v1.1.0...v1.2.0) (2025-06-09)

### Features

- add version file to track application version ([ebcaba9](https://github.com/mohamedouf501/timeline/commit/ebcaba9117f0906271ef8c5e8128f9928630c1fa))

# [1.1.0](https://github.com/mohamedouf501/timeline/compare/v1.0.0...v1.1.0) (2025-06-09)

### Features

- add endpoint to retrieve changelog from CHANGELOG.md ([2d34f76](https://github.com/mohamedouf501/timeline/commit/2d34f76af4c27da1fef836c373a3d30c474d14ee))
