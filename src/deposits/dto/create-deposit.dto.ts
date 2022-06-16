import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  isNumber,
  isString,
  IsPositive,
} from 'class-validator';


export class CreateDepositDto {
  @IsOptional()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @IsString()
  @IsNotEmpty()
  referenceId: string;
}
