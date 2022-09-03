import { Field, GraphQLISODateTime, ID, ObjectType } from '@nestjs/graphql';
import { GraphQLJSONObject } from 'graphql-scalars';
import { Connection, MutationPayload } from '../../../common/entities';

@ObjectType()
export class User {
  @Field(() => ID)
  public id: string;
  @Field()
  public email: string;
  public password?: string;
  @Field(() => GraphQLJSONObject)
  public role: JSON;
  @Field(() => String)
  public name: string;
  @Field(() => GraphQLISODateTime)
  public birthDate: Date;
  @Field(() => GraphQLISODateTime)
  public createdAt: Date;
  @Field(() => GraphQLISODateTime)
  public updatedAt: Date;
}

@ObjectType()
export class UserConnection extends Connection(User) {}

@ObjectType()
export class DeleteUserPayload extends MutationPayload {
  @Field(() => User)
  public user: User;
}
