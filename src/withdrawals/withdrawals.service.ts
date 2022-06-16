import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import {  CreateDepositDto } from './dto';;
import { Withdrawals } from './schemas/withdrawals.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class WithdrawalsService {
  constructor(
    @InjectModel(Withdrawals.name) 
    private readonly withdrawalsModel: Model<Withdrawals>,

    
  ) {}

  public async createWithdrawn(
    payload: CreateDepositDto,
    customerId: string,
  ): Promise<any> {
    const currDate = new Date();
    const now = moment(currDate).local().format('YYYY-MM-DD HH:mm:ss');
   
    const findRef = await this.withdrawalsModel.findOne(
      { referenceId: payload.referenceId },
    );
    if (findRef) {
      throw new NotFoundException(`Reference Id : #${payload.referenceId} already exists`);
    }
    const input = {
      id:  uuidv4(),
      status: 'success',
      amount: payload.amount,
      withdrawnAt: now,
      referenceId: payload.referenceId,
      withdrawnBy: customerId,
    }
    const createDeposits = await this.withdrawalsModel.create(
      input,
    );

    if (!createDeposits) {
      throw new NotFoundException(`Customer #${payload.referenceId} not found`);
    }

    return createDeposits;
  }

  public async findWithdrawals(
    referenceId: string,
  ): Promise<any> {
    const currDate = new Date();
    const now = moment(currDate).local().format('YYYY-MM-DD HH:mm:ss');
   
    const findRef = await this.withdrawalsModel.findOne(
      { referenceId: referenceId },
    );
  
  
    return findRef;
  }
}
