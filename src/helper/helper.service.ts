import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import moment = require('moment');
import { Wallet, WalletSchema } from '../wallet/schemas/wallet.schema';
import { WalletModule } from '../wallet/wallet.module';

@Injectable()
export class HelperService {
  constructor(
    @InjectModel(Wallet.name) readonly walletModel: Model<Wallet>,
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
}
