import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;

// This file contains Auth MongoDb's schema
@Schema({
  collection: 'users',
  collation: { locale: 'it', caseFirst: 'off', strength: 1 },
  toJSON: { transform: removePassword },
  toObject: { transform: removePassword }, // TODO cosa è di preciso?
})
export class Auth {

  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

}


// TODO perché c'è doc? siamo sicuri che non ci sia un errore?
function removePassword(doc: AuthDocument, ret: any):any {
  delete ret.pwd;
}

export const UserSchema = SchemaFactory.createForClass(Auth);