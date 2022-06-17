import { HttpCode, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import { Wallet } from './schemas/wallet.schema';
import { updateAmount } from './dto';
import { throwError } from 'rxjs';
import { ApiError } from '../helper/api.error';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  public async findOne(customerXid: string): Promise<Wallet> {
    const customer = await this.walletModel
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

    const updateWallet = await this.walletModel.findOneAndUpdate(
      { customerXid: customerXid },
        status,
    );
    if (!updateWallet) {
      throw new NotFoundException(`Customer #${customerXid} not found`);
    }

    return updateWallet;
  }

  public async insertAmount(
    payload: updateAmount,
  ): Promise<any> {
    let amt = 0;
    const find = await this.walletModel.findOne(
      { customerXid: payload.customerXid },
    );
    if (find) {
      amt = Number(find.balance) + Number(payload.amount);
    }
    const updateWallet = await this.walletModel.findOneAndUpdate(
      { customerXid: payload.customerXid },
      { balance: amt},
    );

    return;
  }

  public async deductAmount(
    payload: updateAmount,
  ): Promise<any> {
    let amt = 0;
    const result = {
      status: "ok",
      message: "success",
      code: 200
    }
    const find = await this.walletModel.findOne(
      { customerXid: payload.customerXid },
    );
   
    let balance = find.balance;
    let amount = payload.amount
    if (Number(balance) < Number(amount)) {
      result.status = 'failed';
      result.message = 'Balance not enough'
      return result;
      // throw new ApiError("UserNotFount",400,"user not found");
    } else {
      if (find) {
        amt = find.balance - payload.amount;
      }
  
      const updateWallet = await this.walletModel.findOneAndUpdate(
        { customerXid: payload.customerXid },
        { balance: amt},
      );
  
      return result;
    }
    
  }
}
