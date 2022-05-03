import Base from "./templates/base.tsx";

export default function SignUp(){
    return (<Base>
         <div class="form-container container">
            <div class="card mx-4">
                <div class="card-body">
                    <form method="post" action="/signup" enctype="application/x-www-form-urlencoded">
                        <div class="p-1">
                            <div class="mb-3">
                                <label for="name" class="form-label">First Name</label>
                                <input type="text" name="name" class="form-control" id="name" placeholder="Name here" />
                            </div>
                            <div class="mb-3">
                                <label for="surname" class="form-label">Last Name</label>
                                <input type="text" name="surname" class="form-control" id="surname" placeholder="Surname" />
                            </div>
                            <div class="mb-3">
                                <label for="username" class="form-label">Email</label>
                                <input type="email" name="username" class="form-control" id="username" placeholder="name@example.com" />
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="text" class="form-control" id="password" name="password" placeholder="*******" />
                            </div>
                            <div class="mb-3">
                                <label for="retypePassword" class="form-label">
                    Retype Passord
                  </label>
                                <input type="text" class="form-control" data-sync-target="#password" daty-sync-type="eq" id="retypePassword" name="retypePassword" placeholder="*******" />
                            </div>
                        </div>
                        <div class="mb-3 mx-1">
                            <button type="submit " class="btn btn-primary">Sign Up</button>
                        </div>
                        <div class="mb-3 mx-1">
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