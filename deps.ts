//export {Application,Router,engines,staticMiddleware,XapiFormDataFiles,xapiDefaultFileManager, FileManager}
//from "../../xapi/app/mod.ts";
//export {SessionProvider, FileAdapter} from "../../xapi/session/mod.ts";
//export {type AuthenticableInterface,Authenticable,SessionAuthContext,SessionAuth,authExtractor} from "../../xapi/security/mod.ts";

export {Application,Router,engines,staticMiddleware,XapiFormDataFiles,xapiDefaultFileManager, FileManager}
from "https://raw.githubusercontent.com/nikolinmajmari/xapi/main/xapi/app/mod.ts";
export type {TemplateRenderInterface,TemplateParams}
from "https://raw.githubusercontent.com/nikolinmajmari/xapi/main/xapi/app/mod.ts";

export {SessionProvider, FileAdapter} from "https://raw.githubusercontent.com/nikolinmajmari/xapi/main/xapi/session/mod.ts";
export {type AuthenticableInterface,Authenticable,SessionAuthContext,SessionAuth,authExtractor} from "https://raw.githubusercontent.com/nikolinmajmari/xapi/main/xapi/security/mod.ts";
export { config } from "https://deno.land/x/dotenv/mod.ts";

export {InMemorySessionAdapter} from "https://raw.githubusercontent.com/nikolinmajmari/xapi/main/xapi/session/adapter.ts";

//export {h, renderSSR } from "https://deno.land/x/nano_jsx@v0.0.20/mod.ts";








// @deno-types="https://denopkg.com/soremwar/deno_types/react/v16.13.1/react.d.ts"
import * as React from "https://esm.sh/react@17.0.2";
// @deno-types="https://denopkg.com/soremwar/deno_types/react-dom/v16.13.1/server.d.ts"
import * as ReactDOMServer from "https://esm.sh/react-dom@17.0.2/server";

import { createElement as h } from "https://esm.sh/react@17.0.2";

export { React, ReactDOMServer,h};