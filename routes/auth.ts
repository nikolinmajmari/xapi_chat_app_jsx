import {db} from "../services/firebase.js";
import {renderSSR, Router} from "../deps.ts";
import User from "../models/user.ts";
import appAuth from "../config/auth.ts";
import Login from "../jsx/login.tsx";
import SignUp from "../jsx/signup.tsx";
const router = new Router();

router.get("/login",async (ctx,next)=>{
    const html = renderSSR(Login());
    await ctx.res.html(html);
});

router.post("/login",async (ctx,next)=>{
    const form = await ctx.req.body.parseForm();
    const credentials = {
            username:form.get("username"),
            password:form.get("password")
        }
    const user = (await User.get<User>(
        db.where("username","==",credentials.username),
        db.where("password","==",credentials.password)
    )).findLast(()=>true);
    if(user!=undefined){
        await appAuth.of(ctx)?.authenticate(user,[]);
        return await ctx.res.redirect("/");
    }
    return await ctx.res.redirect("/login");
});

router.get("/signup",async (ctx,next)=>{
    const html = renderSSR(SignUp());
    await ctx.res.html(html);
});


router.post("/signup",async (ctx)=>{
    const {req,res} = ctx;
    try{
        if(!req.isApplicationFormUrlEncoded)throw "request should be application/form-url-encoded";
        const form = await req.body.parseForm();
        const {username,password,firstName,lastName} = {
            username:form.get("username"),
            password:form.get("password"),
            firstName: form.get("name"),
            lastName: form.get("surname"),
        };
        if(await User.exists(username!)){
            return await res.redirect(req.referrer);
        }
        const user = new User();
        user.username = username!;
        user.password = password!;
        user.firstName = firstName!;
        user.lastName = lastName!;
        await user.create();
        await appAuth.of(ctx)?.authenticate(user,[]);
        await res.redirect("/");
    }catch(e){
        console.log(e);
        await res.redirect(req.referrer);
    }
});

router.get("/logout",async (ctx,next)=>{
    await appAuth.of(ctx)?.destroy();
    await ctx.res.redirect("/login");
})

export default router;