import { User } from "./user";

export interface RegisterModel extends User{
  password:string;
}
