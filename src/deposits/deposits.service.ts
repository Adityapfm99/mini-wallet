import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import {  CreateDepositDto } from './dto';;
import { Deposit } from './schemas/deposit.schema';
import { v4 as uuidv4 } from 'uuid';
import { Wallet } from '../wallet/schemas/wallet.schema';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel(Deposit.name) 
    private readonly depositModel: Model<Deposit>,

    // private readonly walletModel: Model<Wallet>,
    
  ) {}

  public async createDeposits(
    payload: CreateDepositDto,
    customerId: string,
  ): Promise<any> {
    const currDate = new Date();
    const now = moment(currDate).local().format('YYYY-MM-DD HH:mm:ss');
   
    const findRef = await this.depositModel.findOne(
      { referenceId: payload.referenceId },
    );
    if (findRef) {
      throw new NotFoundException(`Reference Id : #${payload.referenceId} already exists`);
    }
    const input = {
      id:  uuidv4(),
      status: 'success',
      amount: payload.amount,
      depositedAt: now,
      referenceId: payload.referenceId,
      depositedBy: customerId,
    }
    const createDeposits = await this.depositModel.create(
      input,
    );

    if (!createDeposits) {
      throw new NotFoundException(`Customer #${payload.referenceId} not found`);
    }

    return createDeposits;
  }

  public async findDeposit(
    referenceId: string,
  ): Promise<any> {
    const currDate = new Date();
    const now = moment(currDate).local().format('YYYY-MM-DD HH:mm:ss');
   
    const findRef = await this.depositModel.findOne(
      { referenceId: referenceId },
    );
  
  
    return findRef;
  }
}
