import {SessionAuth} from "../deps.ts";
import User from "../models/user.ts";

const auth = new SessionAuth<User>({
    failurePath:"/login",
    userFromJson:(usr)=> Object.assign(new User(),usr)
});

export default auth;