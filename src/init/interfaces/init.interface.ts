import { Document } from 'mongoose';

export interface InitResponse extends Document {
  readonly status: string;
  readonly token: string;
}
