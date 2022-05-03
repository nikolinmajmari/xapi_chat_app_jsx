
import {Application} from "./deps.ts";
import {engines, staticMiddleware} from "./deps.ts";
import appSession from "./config/session.ts";
import appAuth from "./config/auth.ts";
// cereate the app
const app = new Application();
app.setViewEngine(engines.etaEngine.configure({cache: false}));


app.use(staticMiddleware({
    path:"/assets",urlMapper:(url)=>url
}));


app.use(async (ctx,next)=>{
    const start = Date.now();
    console.log("request started on "+start);
    try{
        await next();
    }catch(e){
        console.log(e);
        await ctx.res.text(e.toString());
    }
    console.log("request ended on ",Date.now()-start);
});

/// start sesion 
app.use(appSession.inject());

/// start authentication
app.use(appAuth.authMiddleware());

//// start routes here 


import homeRouter from "./routes/home.ts";
import authRouter from "./routes/auth.tsx";
import chatRouter from "./routes/chat.ts";
app.use(authRouter);
/// authenticated routes 
app.use(appAuth.ensureAuthenticated());
app.use("/",homeRouter);
app.use("/chat",chatRouter);


// start the web server
app.listen(8000);
    