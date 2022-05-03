import { Model } from "./model.ts";

class Message extends Model{
    getType(){return Message}
    chat:string|undefined;
    sender:string|undefined;
    text:string|undefined;
    sentAt:string|undefined;
    isRead:boolean|undefined;
    isSent:boolean|undefined;
    readAt:string|undefined;
}
Message.register("messages");

export default Message;