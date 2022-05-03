import {Router} from "../deps.ts";
import Chat,{ChatUser} from "../models/chat.ts";
import {db} from "../services/firebase.js";
import appAuth from "../config/auth.ts";
import User from "../models/user.ts";
import Message from "../models/message.ts";

const router = new Router();
/**
 * get chats of a user 
 */
router.get("/",async (ctx,next)=>{
    try{
        const user = appAuth.of(ctx)?.getUser()!;
        const chats = await Chat.getUserChats(user);
        return await ctx.res.render("./chat/chats.eta",{chats:chats});
    }catch(e){
        console.log(e);
        return await ctx.res.ineralServerError();
    }
});

/**
 * search for chats to join , or create new chats 
 */
router.get("/search",async (ctx,next)=>{
   try{
    var stamp = Date.now();
    const user = appAuth.of(ctx)!.getUser()!;
    const otherUsers = await User.get<User>(db.where("username","!=",user.username));
    console.log("got users for "+(Date.now()-stamp));
    stamp = Date.now();
    const chats = await Chat.get<Chat>(db.where("users","array-contains",{...ChatUser.fromUser(user)}));
    const contactsId = chats.map(ch=>{
        return ch.getOtherUser(user)?.id!;
    })
    console.log("got contacts "+(Date.now()- stamp));
    stamp = Date.now();
    const nonContacts = otherUsers.filter(o=>!contactsId.includes(o.id!));
    const contacts = otherUsers.filter(o=>contactsId.includes(o.id!));
    console.log("filtered contacts "+(Date.now()- stamp));
    stamp = Date.now();
    await ctx.res.render("./chat/search.eta",{
        contacts:contacts,
        nonContacts:nonContacts
    });
   }catch(e){
       console.log(e);
       return await ctx.res.ineralServerError();
   }
});

router.get("/invite",async (ctx,next)=>{
    const user = appAuth.of(ctx)?.getUser()!;
    const invites = [
        ... await Chat.get<Chat>(db.where("firstUser","==",user.id),db.where("firstUserAcceptance","==",false)),
        ... await Chat.get<Chat>(db.where("secondUser","==",user.id),db.where("secondUserAcceptance","==",false)),
    ];
    return ctx.res.json(invites);
});

router.post("/invite/:user",async (ctx,next)=>{
    try{
        const user = appAuth.of(ctx)!.getUser()!;
        const invUser = await User.find<User>(ctx.req.params.user?.toString()!);
        if(invUser==undefined){
            console.log("user not found");
            return await ctx.res.badRequest();
        }
        if((await  Chat.getUsersChat(user.id!,invUser.id!))!=undefined){
            return await ctx.res.forbidden();
        }
        const chat = new Chat();
        chat.createdAt = Date.now().toString(),
        chat.users = [
            ChatUser.fromUser(user),
            ChatUser.fromUser(invUser),
        ];
        await chat.create();
        await ctx.res.redirect("/chat");
    }catch(e){
        console.log(e);
        await ctx.res.ineralServerError();
    }
});

router.get("/invite/:user",async(ctx,next)=>{
    try{
        const invUser = await User.find<User>(ctx.req.params.user?.toString()!);
        const user = appAuth.of(ctx)!.getUser()!;
        if(invUser==undefined){
            console.log("user not found");
            return await ctx.res.badRequest();
        }
       const invitation = await  Chat.getUsersChat(user.id!,invUser.id!);
       if(invitation==undefined){
           await ctx.res.notFound();
       }
       return await ctx.res.json(invitation);
    }catch(e){
        console.log(e);
        return await ctx.res.ineralServerError();
    }
});


router.use("/:id",async (ctx,next)=>{
    try{
        const chat = await Chat.find<Chat>(ctx.req.params.id as string);
        ctx.attribs.chat = chat;
        await next();
    }catch(e){
        console.log(e);
        await ctx.res.ineralServerError();
    }
});

router.get("/:id",async (ctx,next)=>{
    try{
        const chat:Chat = ctx.attribs.chat;
        const messages:Message[] = await Message.get<Message>(db.where("chat","==",chat.id));
        await ctx.res.render("./chat/messages.eta",{
            chat:chat,
            messages:messages
        });
    }catch(e){
        console.log(e);
        ctx.res.ineralServerError();
    }
});
router.post("/:id",async (ctx,next)=>{
    try{
        const chat:Chat = ctx.attribs.chat;
        const sender = appAuth.of(ctx)?.getUser();
        const messagetext = (await ctx.req.body.parseForm()).get("message");
        const message = Object.assign(new Message(),{
            chat:chat.id,
            sender:sender!.id,
            text:messagetext!,
            sentAt:Date.now(),
            isRead:false,
            isSent:false,
            readAt:undefined,
        });
        await message.create();
        await ctx.res.redirect("/chat/"+chat.id);
    }catch(e){
        console.log(e);
        await ctx.res.ineralServerError();
    }
});




export default router;