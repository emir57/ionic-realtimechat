import { User } from "./user";

export interface FriendRequestModel{
  id?:string;
  senderUserEmail:string;
  receiveUserEmail:string;
  status:number;
  user?:User
}
