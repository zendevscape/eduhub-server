import { Int, Field } from '@nestjs/graphql';
import { ConnectionArguments, ConnectionCursor } from 'graphql-relay';

export abstract class ConnectionArgs implements ConnectionArguments {
  @Field(() => Int, { nullable: true })
  public first?: number;

  @Field(() => Int, { nullable: true })
  public last?: number;

  @Field(() => String, { nullable: true })
  public after?: ConnectionCursor;

  @Field(() => String, { nullable: true })
  public before?: ConnectionCursor;
}
