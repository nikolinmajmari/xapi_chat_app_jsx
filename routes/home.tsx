import {Router,ReactDOMServer,h} from "../deps.ts";
import Home from "../jsx/home.tsx";

const router = new Router();
router.get("/",async (ctx,next)=>{
    const html = ReactDOMServer.renderToString(Home());
    return await ctx.res.html(html);
});

export default router;