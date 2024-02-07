import { ModelDefinition } from '@nestjs/mongoose';
// import { PostDocument, PostSchema } from './post.model';
import { User, UserSchema } from './user.model';

export const UserModelDefinition: ModelDefinition = {
  name: User.name,
  schema: UserSchema,
};
