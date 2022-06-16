import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import { Wallet } from './schemas/wallet.schema';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  public async healthyCheck() {
    const data = {
      uptime: process.uptime(),
      message: 'Ok',
      date: new Date()
    }
    return JSON.stringify(data);
  }

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
}
