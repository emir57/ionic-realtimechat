import { User } from "./user";

export interface FriendRequestModel{
  id?:string;
  senderUserPhoneNumber:string;
  receiveUserPhoneNumber:string;
  status:number;
  user?:User
}
