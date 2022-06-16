import {
  IsNotEmpty,
  IsString,

} from 'class-validator';

export class JwtPayload {
  @IsString()
  @IsNotEmpty()
  readonly customerXid: string;

}


