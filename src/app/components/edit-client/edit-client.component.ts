import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Client';
import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
 
@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  id:string;
  client:Client = {
    firstName:'',
    lastName:'',
    email:'',
    phone:'',
    balance:0
  }

  disableBalanceOnEdit:boolean = true;
  


  constructor(
    public flashMessagesService:FlashMessagesService,
    public route:ActivatedRoute,
    public router:Router,
    public clientService:ClientService,
    public settingsService:SettingsService,
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;
    this.id = this.route.snapshot.params['id'];

    // Get client using the id
    this.clientService.getClient(this.id).subscribe(clientFromFirebase =>{
      this.client = clientFromFirebase;
    });

  }

  onSubmit({valid, value}:{valid:boolean, value:Client}){
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields.',{cssClass:'alert-danger', timeout: 3000})
      this.router.navigate(['edit-client/'+this.id])
    }else{
      // update client
      this.clientService.updateClient(this.id, value);
      this.flashMessagesService.show('Client Updated.',{cssClass:'alert-success', timeout: 3000})
      this.router.navigate(['/client/'+this.id]);
    }
  }

}
