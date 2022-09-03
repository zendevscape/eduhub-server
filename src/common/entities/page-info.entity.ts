import { Field, ObjectType } from '@nestjs/graphql';
import { ConnectionCursor, PageInfo as PageInfoInterface } from 'graphql-relay';

@ObjectType({ isAbstract: true })
export abstract class PageInfo implements PageInfoInterface {
  @Field({ nullable: true })
  public startCursor: ConnectionCursor;

  @Field({ nullable: true })
  public endCursor: ConnectionCursor;

  @Field(() => Boolean)
  public hasPreviousPage: boolean;

  @Field(() => Boolean)
  public hasNextPage: boolean;
}
