import logSchema, { Log } from './log';
import postSchema, { Post } from './post';
import userSchema, { User } from './user';
import userHashSchema, { UserHash } from './user-hash';
import { starter } from '~/lib/mongodb/mongodb.server';

// * 로그 모델
export const LogModel =
  starter.models.Log || starter.model<Log>('Log', logSchema);
// * 게시글 모델
export const PostModel =
  starter.models.Post ||
  starter.model<Post>('Post', postSchema);
// * 유저 해시 모델
export const UserHashModel =
  starter.models.UserHash ||
  starter.model<UserHash>('UserHash', userHashSchema);
// * 유저 모델
export const UserModel =
  starter.models.User || starter.model<User>('User', userSchema);  




