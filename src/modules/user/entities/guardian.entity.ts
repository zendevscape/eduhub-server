import { Field, GraphQLISODateTime, ID, ObjectType, OmitType } from '@nestjs/graphql';
import { Connection, MutationPayload } from '../../../common/entities';
import { User } from './user.entity';

@ObjectType()
export class Guardian extends OmitType(User, ['role'] as const) {
  @Field(() => ID)
  public guardianId: string;
  @Field(() => Boolean)
  public active: boolean;
  @Field(() => GraphQLISODateTime, { nullable: true })
  public deletedAt: Date | null;
}

@ObjectType()
export class GuardianConnection extends Connection(Guardian) {}

@ObjectType()
export class CreateGuardianPayload extends MutationPayload {
  @Field(() => Guardian)
  public guardian: Guardian;
}

@ObjectType()
export class UpdateGuardianPayload extends CreateGuardianPayload {}

@ObjectType()
export class DeleteGuardianPayload extends CreateGuardianPayload {}
