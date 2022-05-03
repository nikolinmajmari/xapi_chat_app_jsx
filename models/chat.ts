import { Model } from "./model.ts";
import {db} from "../services/firebase.js";
import User from "./user.ts";
import Message from "./message.ts";
export class ChatUser{
    id:string|undefined;
    firstName:string|undefined;
    lastName:string|undefined;
    approved=false;
    
    static fromUser(user:User){
        const obj = new ChatUser();
        obj.id = user.id;
        obj.firstName = user.firstName;
        obj.lastName = user.lastName;
        obj.approved = false;
        return obj;
    }
}

export class RawMessage{
    sender:string|undefined;
    text:string|undefined;
    sentAt:number|undefined;
    isRead:boolean|undefined;
    static fromMessage(message:Message){
        return Object.assign<RawMessage,any>(new RawMessage,{
           sender:message.sender,
           text:message.text,
           sentAt:message.sentAt,
           isRead:message.isRead
        });
    }
}

class Chat extends Model{
    getType(){
        return Chat;
    }
    constructor(){
        super();
        this.active=false;
    }
    users:ChatUser[] = [];
    createdAt:string|undefined;
    lastMessage:RawMessage|undefined;
    active:boolean;

    approveBy(user:User){
        for(const _u of this.users){
            if(_u.id == user.id){
                _u.approved = true;
            }
        }
        throw "User Not Found";
    }

    isApprovedBy(user:User){
        for(const _u of this.users){
            if(_u.id == user.id){
                return _u.approved;
            }
        }
        return false;
    }

    getLabel(user:User){
        const other = this.getOtherUser(user);
        return `${other?.firstName} ${other?.lastName}`;
    }

    getOtherUser(user:User){
        console.log("trying to find",user,"on ",this.users);
        return this.users?.find((e)=>e.id!=user.id);
    }

    static async getUsersChat(firstUser:string,otherUser:string,...where:any):Promise<Chat|undefined>{
        const chats = [
            ... await Chat.get<Chat>(db.where("firstUser","==",firstUser),db.where("secondUser","==",firstUser),...where),
            ... await Chat.get<Chat>(db.where("secondUser","==",firstUser),db.where("firstUser","==",firstUser),...where)
        ];
        return chats.find(()=>true);
    }

    static async getUserChats(user:User,...where:any):Promise<Chat[]|undefined>{
        return [
            ... await Chat.get<Chat>(db.where("users","array-contains",{...ChatUser.fromUser(user!)}),...where),
        ];
    }

    static async getUserActiveChats(user:User):Promise<Chat[]|undefined>{
        return await this.getUserChats(user!,db.where("active","==",true));
    }

    static fromDocument<T extends Model=Chat>(document:any):T {
        const chat = new Chat();
        Object.assign(chat, document);
        const users:ChatUser[] = document?.users?.map((u:any)=>{
            return Object.assign(new ChatUser(),u);
        })??[];
        chat.users = users;
        return chat as unknown as  T;
    }
}

Chat.register("chats");

export default Chat;