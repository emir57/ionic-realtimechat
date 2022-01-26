import { Message } from "./message";
import { User } from "./user";

export interface GroupModel{
  id?:string;
  groupName:string;
  groupCreateDate:string;
  user1PhoneNumber:string;
  user2PhoneNumber:string;
  user?:User
  lastMessage?:Message;
}
