import { Message } from "./message";
import { User } from "./user";

export interface GroupModel{
  id?:string;
  groupName:string;
  groupCreateDate:string;
  user1Email:string;
  user2Email:string;
  user?:User
  lastMessage?:Message;
}
