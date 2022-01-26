import { User } from "./user";

export interface FriendModel{
  id?:string;
  currentUserPhoneNumber:string;
  friendUserPhoneNumber:string;
  user?:User;
}
