
import {React,h} from "../../deps.ts";
export default function AuthBase(props:any){
    return (<html>
                <head>
                    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet"/>
                </head>
                <body>
                    <Nav/>
                    <main className="d-flex flex-column justify-content-start">
                        {props.children}
                    </main>
                    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js "></script>
                </body>
            </html>);
}

function Nav(){
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
            <a className="navbar-brand" href="#">Chatt App</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarScroll">
            <ul className="navbar-nav me-auto my-2 my-lg-0 navbar-nav-scroll">
                <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/chat">Chats</a>
                </li>
                <li className="nav-item">
                <a className="nav-link" href="/chat/search">Contacts</a>
                </li>
            </ul>
            <div className="d-flex flex-row justify-content-end">
               <a className="btn btn-outline-success" href="/logout">Logout</a>
            </div>
            </div>
        </div>
    </nav>
    );
}