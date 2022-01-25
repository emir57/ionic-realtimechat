import { GroupModel } from "./group";
import { Message } from "./message";

export interface GroupChatModel{
  messages:Message[];
  groups:GroupModel[];
}
