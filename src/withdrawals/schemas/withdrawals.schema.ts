import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Withdrawals extends Document {
  @Prop()
  id: string;

  @Prop({ unique: true })
  withdrawnBy: string;

  @Prop()
  status: string;

  @Prop()
  withdrawnAt: string;

  @Prop()
  amount: number;

  @Prop()
  referenceId: string;

}

export const WithdrawalsSchema = SchemaFactory.createForClass(Withdrawals);
