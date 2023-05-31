import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { Document } from 'mongoose';

export type AuthDocument = Auth & Document;
// This file contains Auth MongoDb's schema
@Schema({
  collection: 'users',
  collation: { locale: 'it', caseFirst: 'off', strength: 1 },
  toJSON: { transform: removePassword }, // serve per dare una lista di utenti con tutti i loro dettagli, in formato json
  toObject: { transform: removePassword }, // serve per dare una lista di utenti con tutti i loro dettagli, restituendola come object
})
export class Auth {
  @Prop({ required: true })
  username: string;
  @Prop({ required: false })
  password: string;
}
function removePassword(doc: AuthDocument, ret: AuthDocument):void {
  delete ret.password;
}
export const UserSchema = SchemaFactory.createForClass(Auth);