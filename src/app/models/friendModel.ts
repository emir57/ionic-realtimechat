import { User } from "./user";

export interface FriendModel{
  id?:string;
  currentUserEmail:string;
  friendUserEmail:string;
  user?:User;
}
