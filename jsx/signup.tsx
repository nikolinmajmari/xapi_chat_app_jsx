
import {React,h} from "../deps.ts";
import Base from "./templates/base.tsx";
export default function SignUp(){
    return (<Base>
         <div className="form-container container">
            <div className="card mx-4">
                <div className="card-body">
                    <form method="post" action="/signup" encType="application/x-www-form-urlencoded">
                        <div className="p-1">
                            <div className="mb-3">
                                <label className="form-label">First Name</label>
                                <input type="text" name="name" className="form-control" id="name" placeholder="Name here" />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Last Name</label>
                                <input type="text" name="surname" className="form-control" id="surname" placeholder="Surname" />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Email</label>
                                <input type="email" name="username" className="form-control" id="username" placeholder="name@example.com" />
                            </div>
                            <div className="mb-3">
                                <label  className="form-label">Password</label>
                                <input type="text" className="form-control" id="password" name="password" placeholder="*******" />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">
                    Retype Passord
                  </label>
                                <input type="text" className="form-control" data-sync-target="#password" daty-sync-type="eq" id="retypePassword" name="retypePassword" placeholder="*******" />
                            </div>
                        </div>
                        <div className="mb-3 mx-1">
                            <button type="submit" className="btn btn-primary">Sign Up</button>
                        </div>
                        <div className="mb-3 mx-1">
                            <label>Already have an account</label>
                            <a href="/login">Sign in</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </Base>
    );
}