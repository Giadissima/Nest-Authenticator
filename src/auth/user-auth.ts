import { Types } from "mongoose";

/* eslint-disable @typescript-eslint/naming-convention */
export class UserAuth {
  _id: Types.ObjectId;
  username: string;

  constructor(payload: UserAuth) {
    Object.assign(this, payload); // TODO serve ancora questo assign?
  }
}