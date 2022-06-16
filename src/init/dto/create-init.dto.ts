import { MaxLength, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class createInit {
  @IsString()
  @IsNotEmpty()
  customerXid: string;

}
