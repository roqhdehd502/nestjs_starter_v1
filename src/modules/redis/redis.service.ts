import { Injectable } from '@nestjs/common';

import redis, { pub, sub } from '~/lib/redis/redis.server';

@Injectable()
export class RedisService {
  constructor() {}

  getClient() {
    return redis;
  }

  getPublisher() {
    return pub;
  }

  getSubscriber() {
    return sub;
  }
}
