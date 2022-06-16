import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  isNumber,
} from 'class-validator';

export class RegistrationDto {
  @IsString()
  @IsNotEmpty()
  customerXid: string;

}


