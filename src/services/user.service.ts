import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserPostDTO } from '../models/user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async getById(id: string) {
    const user = await this.userModel.findById({ id });
    if (!user) {
      throw new NotFoundException('Not found user', {
        cause: new Error(),
        description: '등록된 유저 정보를 찾을 수 없습니다',
      });
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userModel.findOne({ email: email });
    if (!user) {
      throw new NotFoundException('Not found user', {
        cause: new Error(),
        description: '등록된 유저 정보를 찾을 수 없습니다',
      });
    }

    return user;
  }

  async create(body: UserPostDTO) {
    const existUser = await this.userModel.findOne({ email: body.email });
    if (existUser) {
      throw new ConflictException('Already user', {
        cause: new Error(),
        description: '사용자 이메일은 이미 존재합니다',
      });
    }

    const newUser = await this.userModel.create({
      ...body,
      createdAt: Date.now(),
    });

    return newUser.readOnlyData;
  }
}
