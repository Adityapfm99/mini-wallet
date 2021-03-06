import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class Deposit extends Document {
  @Prop()
  id: string;

  @Prop({ unique: true })
  depositedBy: string;

  @Prop()
  status: string;

  @Prop()
  depositedAt: string;

  @Prop()
  amount: number;

  @Prop()
  referenceId: string;

}

export const DepositSchema = SchemaFactory.createForClass(Deposit);
