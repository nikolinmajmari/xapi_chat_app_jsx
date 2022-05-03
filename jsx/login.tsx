import Base from "./templates/base.tsx";

export default function Login(){
    return (<Base>
         <div class="form-container container">
            <div class="card mx-4">
                <div class="card-body">
                    <form method="post" action="/login" enctype="application/x-www-form-urlencoded">
                        <div class="p-1">
                            <div class="mb-3">
                                <label for="username" class="form-label">Username</label>
                                <input type="email" name="username" class="form-control" id="username" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="text" class="form-control" id="password" name="password" placeholder="*******" />
                            </div>
                        </div>
                        <div class="mb-3 mx-1">
                            <button type="submit " class="btn btn-primary">Login</button>
                        </div>
                        <div class="mb-3 mx-1">
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