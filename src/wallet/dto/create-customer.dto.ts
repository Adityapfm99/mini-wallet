import {
  MaxLength,
  IsNotEmpty,
  IsEmail,
  IsString,
  IsOptional,
  isNumber,
  IsNumber,
} from 'class-validator';

export class CreateCustomerDto {
  @IsString()
  @IsNotEmpty()
  customerXid: string;

}

export class updateAmount {
  @IsString()
  @IsNotEmpty()
  customerXid: string;
  
  @IsNumber()
  amount: number

}

export class WalletDto {
  @IsString()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  ownedBy: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  status: string;

  @IsString()
  @MaxLength(30)
  @IsNotEmpty()
  enableAt: Date;

  @IsNotEmpty()
  balance: number;
}

