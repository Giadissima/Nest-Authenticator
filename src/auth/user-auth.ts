/* eslint-disable @typescript-eslint/naming-convention */
export interface IUserAuth {
  _id: string;
  email: string;
}
export class UserAuth implements IUserAuth {
  _id: string;
  email: string;

  constructor(payload: IUserAuth) {
    Object.assign(this, payload);
  }
}