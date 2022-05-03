
import {React,h} from "../../deps.ts";
export default function Base(props:any){
    return (<html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
                </head>
                <body>
                    <main className="d-flex flex-column justify-content-center" style={{height:"100%"}}>
                        {props.children}
                    </main>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js "></script>
                </body>
            </html>);
}