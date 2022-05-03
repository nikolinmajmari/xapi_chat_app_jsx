import {React,h} from "../../deps.ts";
import AuthBase from "../templates/auth_base.tsx";


export default function Chats({user,chats}:{[key:string]:any}){
    return (<AuthBase>
        <div className="container-fluid">

<div className="users-container p-4">
    <h4 className="mb-4"> Invite to Chat</h4>
    { 
        chats.map((chat:any)=><Chat chat={chat} user={user}/>)
    }
</div>
</div>
    </AuthBase>
    );
}

function Chat({chat,user}:{[key:string]:any}){
    const other = chat.getOtherUser(user);
    const chatUrl = "/chat/"+chat.id;
    return (
        <div className="card card-body m-2">
          <div className="d-flex flex-row">
              <div className="flex-column d-flex" style={{flex:1}}>
                  <h5 className="text-lg">{other.firstName}&nbsp;&nbsp;{other.lastName}</h5>
                  <br/>
              </div>
               <div className="flex-column d-flex">
                <a className="btn btn-primary chat-open" href={chatUrl}>Chat</a>
              </div>
          </div>
      </div>
    );
}