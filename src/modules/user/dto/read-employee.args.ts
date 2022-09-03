import { ArgsType } from '@nestjs/graphql';
import { ReadUserArgs } from './read-user.args';

@ArgsType()
export class ReadEmployeeArgs extends ReadUserArgs {}
