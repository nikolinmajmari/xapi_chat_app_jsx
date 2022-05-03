import {Router} from "../deps.ts";

const router = new Router();
router.get("/",async (ctx,next)=>{
    console.log("hey papa");
    await ctx.res.render("./home.eta",{message:"hellow world"});
});

export default router;