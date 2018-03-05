import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Client';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { FlashMessagesService } from 'angular2-flash-messages'
 

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {
  client:Client = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: 0
  }
  // disabled by default
  disableBalanceOnAdd:boolean = true;

  constructor(
    public flashMessagesService:FlashMessagesService,
    public router:Router,
    public clientService:ClientService,
    public settingsService:SettingsService,
  ) { }

  // initialize the settings config 
  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({valid, value}:{valid:boolean, value:Client}){
    // initially set balance to 0;
    if(this.disableBalanceOnAdd){
      value.balance = 0;
    }
    if(!valid){
      this.flashMessagesService.show('Please fill in all fields.',{cssClass:'alert-danger', timeout: 3000})
      this.router.navigate(['add-client'])
    }else{
      // add new client
      this.clientService.newClient(value);
      this.flashMessagesService.show('New client added.',{cssClass:'alert-success', timeout: 3000})
      this.router.navigate(['/']);
    }

  }

}
