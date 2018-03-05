import { Client } from './../models/Client';
import { Observable } from 'rxjs';
import { AngularFireDatabase,FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2/database';
import { Injectable, enableProdMode } from '@angular/core';

@Injectable()
export class ClientService {
  clients: FirebaseListObservable<any[]>;
  client: FirebaseObjectObservable<any>;
  constructor(
    public af:AngularFireDatabase
  ) { 
    this.clients = this.af.list('/clients') as FirebaseListObservable<Client[]>;
  }

  // Methods
  getClients(){
    return this.clients;
  }

  newClient(client:Client){
    // clients is a firebase observable to just push
    this.clients.push(client);
  }

  // Get client from Firebase DB
  getClient(id:string){
    // object takes in a string but now we concat this id to the clients
    this.client = this.af.object('/clients/'+id) as FirebaseObjectObservable<Client>;
    return this.client;
  }

  updateClient(id:string, client:Client){
    return this.clients.update(id, client);
  }

  deleteClient(id:string){
    this.clients.remove(id);
  }

  getClientId(email:string){
    

  }



}
