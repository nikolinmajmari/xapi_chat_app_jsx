import {SessionProvider, FileAdapter, InMemorySessionAdapter} from "../deps.ts";
import {config} from "../dotenv.ts";
const envConf = await config();

let adapter:any ;
if(envConf["DEPLOY"]=="deno_depploy"){
  console.log("loaded",envConf);
  adapter = new InMemorySessionAdapter();
}else{
  adapter = new FileAdapter().configure({sessionPath:"./var/session"});
}
const appSession = new SessionProvider({
  adapter: new InMemorySessionAdapter(),
  lifetime: 1020202,
  secret: "secret",
});

export default appSession;
