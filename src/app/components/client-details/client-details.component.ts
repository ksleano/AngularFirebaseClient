import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Client';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService, FlashMessagesModule } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {
  id:string;
  client:Client;
  hasBalance:boolean = false;
  showBalanceUpdateInput:boolean = false;


  constructor(
    public flashMessagesService:FlashMessagesService,
    public router:Router,
    public route:ActivatedRoute,
    public clientService:ClientService
  ) { }

  ngOnInit() {
    // Get ID
    this.id = this.route.snapshot.params['id'];
    
    console.log(this.id);
    // Get Client
    this.clientService.getClient(this.id).subscribe(clientFromFirebase =>{
      // the client owes me monneies
      if(clientFromFirebase.balance > 0){
        this.hasBalance = true;
      }
      this.client = clientFromFirebase;
      console.log(this.client);
    });

  }

  updateBalance(id:string){
    // update Client
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show("Balance Updated", {cssClass:'alert-success', timeout: 3333});
    this.router.navigate(['/client/'+this.id]);
  }

  onDeleteClick(){
    if(confirm('Are ye sure to delete?')){
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show("Client deleted", {cssClass:'alert-success', timeout: 3333});
      this.router.navigate(['/']);
    }
  }

}
