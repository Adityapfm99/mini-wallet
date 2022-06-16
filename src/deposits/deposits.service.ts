import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import {  CreateDepositDto } from './dto';;
import { Deposit } from './schemas/deposit.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class DepositService {
  constructor(
    @InjectModel(Deposit.name) private readonly depositModel: Model<Deposit>,
  ) {}

  public async healthyCheck() {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    return JSON.stringify(data);
  }

  public async findOne(customerXid: string): Promise<Deposit> {
    const customer = await this.depositModel
      .findOne({ customerXid: customerXid })
      .exec();

    if (!customer) {
      throw new NotFoundException(`Customer #${customerXid} not found`);
    }

    return customer;
  }

  public async update(
    customerXid: string,
    isEnable: boolean,
  ): Promise<any> {
    const currDate = new Date();
    let status;
    const now = moment(currDate).local().format('YYYY-MM-DD HH:mm:ss');
    if (isEnable == true) {
      status = { status: 'enable', enableAt: now}
    } else {
      status = { status: 'disable', disableAt: now}
    }

    const updateWallet = await this.depositModel.findOneAndUpdate(
      { customerXid: customerXid },
        status,
    );

    if (!updateWallet) {
      throw new NotFoundException(`Customer #${customerXid} not found`);
    }

    return updateWallet;
  }

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
      { input },
    );

    if (!createDeposits) {
      throw new NotFoundException(`Customer #${payload.referenceId} not found`);
    }

    return createDeposits;
  }
}
