import { User } from "./user";

export interface Message{
  id?:string;
  text:string;
  groupId:string;
  date:string;
  user?:User
}
