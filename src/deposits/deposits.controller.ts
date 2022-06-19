import {
  Controller,
  Post,
  HttpStatus,
  UnauthorizedException,
  Headers,
  HttpException,
  Patch,
  Get,
  Body,
  Header,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { DepositService } from './deposits.service';
import { CreateDepositDto } from './dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';
import { WalletService } from '../wallet/wallet.service';

@ApiTags('Deposits')
@Controller('v1/wallet')
export class DepositsController {
  constructor(
    private readonly depositService: DepositService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('deposits')
  async deposits(
    @Headers('Authorization') token = '',
    @Body() payload: CreateDepositDto,
  ): Promise<any> {
    let bearer: string = '';
    let response;
    if (typeof token != 'undefined') {
      bearer = token.replace('Bearer ', '');
    }
    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
    
    let createDeposit;
    const isValid = await this.isTokenValid(bearer);
    if (isValid) {
      const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
      const customerXid = await this.jwtService.verifyAsync(
        bearer,
        verifyOptions,
      );

      const customerId = customerXid.customerXid.customerXid;

      createDeposit = await this.depositService.createDeposits(
        payload,
        customerId,
      );
      // update amount to wallet
      const input = {
        customerXid: customerId,
        amount: payload.amount,
      };

      const data = await axios({
        method: 'POST',
        url: `http://localhost:3000/api/v1/wallet/insert-amount`,
        data: input,
      });
      const result = await this.depositService.findDeposit(payload.referenceId);
      const resp = {
        status: 'success',
        data: {
          deposit: {
            id: result.id,
            deposited_by: result.depositedBy,
            status: 'success',
            deposited_at: result.depositedAt,
            amount: payload.amount,
            reference_id: payload.referenceId,
          },
        },
      };

      return resp;
    }
    if (!isValid) {
      throw new UnauthorizedException('Invalid Token!');
    }

    if (createDeposit) {
      response = {
        data: {
          token: createDeposit.id,
        },
        status: 'success',
      };
    } else {
      throw new UnauthorizedException('Customer Not Found');
    }

    return response;
  }

  private async isTokenValid(bearerToken: string): Promise<boolean> {
    const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
    let isValid: boolean = false;
    try {
      const customerXid = await this.jwtService.verifyAsync(
        bearerToken,
        verifyOptions,
      );

      isValid = true;
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }
}
