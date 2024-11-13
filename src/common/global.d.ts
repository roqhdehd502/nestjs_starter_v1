import { GetUserDto } from '~/modules/user/dto/user.dto';

export {};

declare global {
  /**
   * interface
   */
  interface JwtPayload {
    user: GetUserDto;
    tokenType?: string;
  }

  /**
   * type
   */
  type LogType = 'info' | 'error';
}
