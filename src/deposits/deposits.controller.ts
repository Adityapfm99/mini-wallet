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
import { JwtService } from '@nestjs/jwt';
import { CreateInitDto, disableDto } from '../register/dto';
import { DepositService } from './deposits.service';
import { CreateDepositDto } from './dto';
// import axios from 'axios';

@ApiTags('Deposits')
@Controller('v1/wallet')
export class DepositsController {
  constructor(
    private readonly depositService: DepositService,
    private configService: ConfigService,
    private readonly jwtService: JwtService,
  ) {}

  @Post('deposits')
  async deposits(@Headers('Authorization') token = '', @Body() payload: CreateDepositDto): Promise<any> {
    let bearer: string = '';
    let response;
    if (typeof token != 'undefined') {
      bearer = token.replace('Bearer ', '');
    }
    if (bearer === '') {
      throw new UnauthorizedException('No Token provided!');
    }
    let createDeposit;
    console.log("11111111")
    const isValid = await this.isTokenValid(bearer);
    console.log("222222222")
    if (isValid) {
      const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
      const customerXid = await this.jwtService.verifyAsync(
        bearer,
        verifyOptions,
      );
      const customerId = customerXid.customerXid.customerXid;

      createDeposit = await this.depositService.createDeposits(payload, customerId);
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
    console.log('88888888',bearerToken)
    const verifyOptions = { secret: this.configService.get('JWT_SECRET') };
    console.log('333333333333',verifyOptions)
    let isValid: boolean = false;
    try {
      const customerXid = await this.jwtService.verifyAsync(
        bearerToken,
        verifyOptions,
      );
      console.log('999999999',customerXid)
      const payload = customerXid.customerXid.customerXid;
      const cust = await this.depositService.findOne(payload);
    //   const cust  = await axios({
    //     method: 'GET',
    //     url: `http://localhost:3000/api/v1/wallet`,
    //     data: payload,
    // });
    console.log(cust)

      if (cust) {
        isValid = true;
      }
    } catch (error) {
      throw new HttpException(error, HttpStatus.UNAUTHORIZED);
    }
    return isValid;
  }

  
}
