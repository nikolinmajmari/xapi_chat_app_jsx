import {React,h} from "../../deps.ts";
import AuthBase from "../templates/auth_base.tsx";

export default function Messages({messages}:any){
    return (<AuthBase>
<div className="container d-flex flex-column" style={{flex:1}} >
    <div className="d-flex flex-column" style={{flex:1,overflowY:"scroll",backgroundColor:"white"}}>
        {messages.map((msg:any)=><Message message={msg}/>)}    
    </div>
    <div className="d-flex flex-row">
      <form method="post" className="d-flex flex-row" style={{flex:1}}>
          <input type="text" name="message" className="form-control"  style={{flex:1}}/>
          <button type="submit" className="btn btn-primary">Sent</button>
      </form>
    </div>
</div>
    </AuthBase>);
}

function Message({message}:any){
    return ( <div className="card card-body m-2">
    <div className="d-flex flex-row">
        <div className="flex-column d-flex" style={{flex:1}}>
            <label className="text-lg">{message.text}</label>
        </div>
    </div>
</div>);
}











