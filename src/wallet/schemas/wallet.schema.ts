import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Wallet extends Document {
  @Prop({ unique: true })
  id: string;

  @Prop({ unique: true })
  ownedBy: string;

  @Prop()
  status: string;

  @Prop()
  enableAt: string;

  @Prop()
  disableAt: string;

  @Prop()
  balance: number;

}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
