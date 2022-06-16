import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  isNumber,
  IsBoolean,
} from 'class-validator';

export class CreateInitDto {
  @IsString()
  @IsNotEmpty()
  customerXid: string;

}

export class disableDto {
  @IsBoolean()
  isDisable: boolean;

}
