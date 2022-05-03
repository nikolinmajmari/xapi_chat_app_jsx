
import {React,h} from "../deps.ts";
import Base from "./templates/base.tsx";

export default function Login(){
    return (<Base>
         <div className="form-container container">
            <div className="card mx-4">
                <div className="card-body">
                    <form method="post" action="/login" encType="application/x-www-form-urlencoded">
                        <div className="p-1">
                            <div className="mb-3">
                                <label className="form-label">Username</label>
                                <input type="email" name="username" className="form-control" id="username" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Password</label>
                                <input type="text" className="form-control" id="password" name="password" placeholder="*******" />
                            </div>
                        </div>
                        <div className="mb-3 mx-1">
                            <button type="submit" className="btn btn-primary">Login</button>
                        </div>
                        <div className="mb-3 mx-1">
                            <label>Dont you have an account</label>
                            <a href="/signup">Sign up</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </Base>
    );
}