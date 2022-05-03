import {React,h} from "../../deps.ts";
import AuthBase from "../templates/auth_base.tsx";


export default function Search({contacts,nonContacts}:any){
    return (
        <AuthBase>
            <div className="container-fluid">
                <div className="users-container p-4">
                    <h4 className="mb-4"> Invite to Chat</h4>
                    {nonContacts.map((non:any)=><NonContactUser user={non}/>)}
                </div>
                <div className="users-container p-4">
                    <h4 className="mb-4">Already Invited </h4>
                    {contacts.map((non:any)=><NonContactUser user={non}/>)}
                </div>
            </div>
        </AuthBase>
    );
}

function NonContactUser({user}:any){
    const inviteLink = "/chat/invite/"+user.id;
    return (
        <div className="card card-body m-2">
        <div className="d-flex flex-row">
            <div className="flex-column d-flex" style={{flex:1}}>
                <h5 className="text-lg">{user.username}</h5>
                <br/>
                <label className="text-lg">{user.firstName}&nbsp;&nbsp;{user.lastName}</label>
            </div>
            <div className="flex-column d-flex">
               <form action={inviteLink} method="post">
                    <button className="btn btn-primary">Invite</button>
               </form>
            </div>
        </div>
    </div>
    );
}

function ContactUser({user}:any){
    const chatLink = "/chat/user/"+user.id;
    return (
        <div className="card card-body m-2">
        <div className="d-flex flex-row">
            <div className="flex-column d-flex" style={{flex:1}}>
                <h5 className="text-lg">{user.username}</h5>
                <br/>
                <label className="text-lg">{user.firstName}&nbsp;&nbsp;{user.lastName}</label>
            </div>
            <div className="flex-column d-flex">
               <form action={chatLink} method="post">
                    <a className="btn btn-primary" href={chatLink}>Chat</a>
               </form>
            </div>
        </div>
    </div>
    );
}












