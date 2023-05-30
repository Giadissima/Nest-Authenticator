import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type UserDocument = User & Document;

// This file contains User schema for MongoDB
@Schema({
  collection: 'users',
  collation: { locale: 'it', caseFirst: 'off', strength: 1 },
})
export class User {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

}

export const UserSchema = SchemaFactory.createForClass(User);