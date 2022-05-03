import { Model } from "./model.ts";
import { AuthenticableInterface } from "../deps.ts";
import {db} from "../services/firebase.js";
export default class User extends Model implements AuthenticableInterface{
    constructor(){
        super();
        this.username = "";
    }
    username:string;
    password:string|undefined;
    firstName:string|undefined;
    lastName:string|undefined;
    getType(){
        return User
    }

    isValid():boolean{
        return this.username!=undefined && this.password!=undefined && this.firstName!=undefined && this.lastName !=undefined;
    }

    static async exists(username:string):Promise<boolean>{
        const user = (await User.get<User>(db.where("username","==",username))).findLast(()=>true);
        return user!=undefined;
    }
}

User.register("users");
