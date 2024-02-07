import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { User, UserPostDTO } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async postUser(body: UserPostDTO) {
    const { email, name, password } = body;

    const isExistUser = await this.userModel.exists({ email });
    if (isExistUser) {
      throw new UnauthorizedException('Already exists the user', {
        cause: new Error(),
        description: '이미 회원가입 된 계정입니다',
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email: email,
      name: name,
      password: hashedPassword,
      createdAt: Date.now(),
    });

    return user.readOnlyData;
  }
}
