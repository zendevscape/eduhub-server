import { Field } from '@nestjs/graphql';

export abstract class MutationPayload {
  @Field(() => String, { nullable: true })
  public clientMutationId?: string;
}
