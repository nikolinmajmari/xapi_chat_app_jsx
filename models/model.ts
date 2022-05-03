import {db} from "../services/firebase.js";

export class Model{
    static collection:string|undefined;
    static type : typeof Model;
    get id():string|undefined{return this._id;}
    protected _id:string|undefined;
    getType():any{
        return Model;
    }
    static fromDocument<T extends Model>(document:any): T {
        const type = new this.type();
        return Object.assign(type, document);
    }

    static register(collection:string){
        this.collection = collection;
        this.type = this;
    }

    static async get<T extends Model>(...where:any[]):Promise<T[]>{
        const collection = db.collection(db.db,this.collection);
        const query = db.query(collection,...where);
        const querySnapshot = await db.getDocs(query);
        const res =  querySnapshot.docs.map(doc=>{
            return this.fromDocument<T>({...doc.data(),_id:doc.id})
        });
        return res;
    }

    static async find<T extends Model>(id:string):Promise<T|undefined>{
        const snapshot = await db.getDoc(db.doc(db.db, this.collection, id))
        if(snapshot.data()!=undefined){
            return this.fromDocument<T>({...snapshot.data(),_id:snapshot.id})
        }
        return undefined;
    }

    static async delete<T extends Model>(...where:any[]):Promise<void>{
        const collection =  db.collection(db.db,this.collection);
        const query =  db.query(collection,...where);
        const querySnapshot = await db.getDocs(query);
        await Promise.all(querySnapshot.docs.map((doc:any) => db.deleteDoc(doc.ref)));
    }

    async create<T extends Model>():Promise<any>{
        const collection = db.collection(db.db,this.getType().collection);
        const ref =  await db.addDoc(collection, JSON.parse(JSON.stringify(this)));
        this._id = ref.id
        return ref;
    }

    async update<T extends Model>():Promise<void>{
        if(this.id==undefined){
            throw "can not update not created model";
        }
        await db.setDoc(db.doc(db.db,this.getType().collection,this.id),{
            ...this
        },{merge:true})
    }
}

