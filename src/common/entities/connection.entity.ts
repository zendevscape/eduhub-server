import { Field, ObjectType } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Edge as EdgeInterface, Connection as BaseConnectionInterface } from 'graphql-relay';
import { PageInfo } from './page-info.entity';

export interface ConnectionInterface<T> extends BaseConnectionInterface<T> {
  nodes: Array<T>;
}

export function Connection<T>(type: Type<T>): Type<ConnectionInterface<T>> {
  @ObjectType(`${type.name}Edge`, { isAbstract: true })
  abstract class Edge<T> implements EdgeInterface<T> {
    @Field(() => String)
    public cursor: string;

    @Field(() => type)
    public node: T;
  }

  @ObjectType(`${type.name}Connection`, { isAbstract: true })
  abstract class Connection<T> implements ConnectionInterface<T> {
    @Field(() => [Edge], { nullable: true })
    public edges: Edge<T>[];

    @Field(() => [Edge], { nullable: true })
    public nodes: T[];

    @Field(() => PageInfo, { nullable: true })
    public pageInfo: PageInfo;
  }

  return Connection as Type<ConnectionInterface<T>>;
}
