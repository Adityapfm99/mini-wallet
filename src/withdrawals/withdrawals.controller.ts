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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { WithdrawalsService } from './withdrawals.service';
import { CreateDepositDto } from './dto';
import axios from 'axios';
import { JwtService } from '@nestjs/jwt';

@ApiTags('Withdrawals')
@Controller('v1/wallet')
export class WithdrawalsController {
  constructor(
    private readonly withdrawalsService: WithdrawalsService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('withdrawals')
  async deposits(
    @Headers('Authorization') token = '',
    @Body() payload: CreateDepositDto,
  ): Promise<any> {
    let bearer: string = '';
    let response;
    let resp;
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

      createDeposit = await this.withdrawalsService.createWithdrawn(
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
        url: `http://localhost:3000/api/v1/wallet/deduct-amount`,
        data: input,
      });
      if (data.data.status =='ok') {
        const result = await this.withdrawalsService.findWithdrawals(
          payload.referenceId,
        );
        resp = {
          status: 'success',
          data: {
            withdrawn: {
              id: result.id,
              withdrawn_by: result.withdrawnBy,
              status: 'success',
              withdrawn_at: result.withdrawnAt,
              amount: payload.amount,
              reference_id: payload.referenceId,
            },
          },
        };
      } else {
        resp = {
          status: 'failed',
          message: 'Your balance not enough',
        };
      }

      return resp;
    }
    if (!isValid) {
      throw new UnauthorizedException('Invalid Token!');
    }

    if (createDeposit) {
      response = {
        data: {
          tokent: createDeposit.id,
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
