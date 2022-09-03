import { Field, InputType } from '@nestjs/graphql';
import { CreateUserInput } from './create-user.input';

@InputType()
export class CreateStudentInput extends CreateUserInput {
  @Field(() => String)
  public guardianId: string;
  @Field(() => String)
  public fatherName: string;
  @Field(() => String)
  public motherName: string;
  @Field(() => Boolean, { nullable: true })
  public active?: boolean;
}
