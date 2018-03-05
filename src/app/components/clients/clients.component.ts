import { Client } from './../../models/Client';
import { Component, OnInit } from '@angular/core';
// bring the service to the client
import { ClientService } from './../../services/client.service';


@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {
  clients:Client[]; 
  totalOwed:number; 
  constructor(
    public clientService:ClientService
  ) { 
  }

  ngOnInit() {
    // When this component initializes we need to fetch 
    // data from the service. Also this is an observable
    // so subscribe
    this.clientService.getClients().subscribe(clientsFromService =>{
      // pass the clients returned from the service to clients
      this.clients = clientsFromService;
      this.getTotalOwed();      
      console.log(this.clients);
      console.log(this.totalOwed);
      

    });
  }

  getTotalOwed(){
    let total = 0;
    let bal;
    for(let i = 0; i < this.clients.length; i++){
      bal = this.clients[i].balance;
      total = total + parseFloat(bal);
    }
    this.totalOwed = total;
  }
}
