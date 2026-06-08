import {
  DataSource,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
} from 'typeorm';
import { Logger } from '@nestjs/common';
import { User } from '@/users/entities/user.entity';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  private readonly logger = new Logger(UserSubscriber.name);

  constructor(dataSource: DataSource) {
    dataSource.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeInsert(event: InsertEvent<User>): void | Promise<any> {
    this.logger.log(`beforeInsert`, JSON.stringify(event.entity));
  }

  afterInsert(event: InsertEvent<User>): void | Promise<any> {
    this.logger.log(`afterInsert`, JSON.stringify(event.entity));
  }
}
