import { SettingsService } from './../../services/settings.service';
import { ClientService } from './../../services/client.service';
import { Client } from './../../models/Client';
import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isLoggedIn:boolean;
  loggedInUser:string;
  showRegister:boolean;
  loggedInUserId:string;

  constructor(
    // dependencies
    public flashmessagesService:FlashMessagesService,
    public router:Router,
    private authService:AuthService,
    public clientService:ClientService,
    public settingsService:SettingsService
  ) { }

  ngOnInit() {
    // import settings
    this.showRegister = this.settingsService.getSettings().allowRegistration;

    // auth has email, userid ete.
    this.authService.getAuth().subscribe(auth => {
      if(auth){
        this.isLoggedIn = true;
        this.loggedInUser = auth.email;
        console.log(this.loggedInUserId); 
      }else{
        this.isLoggedIn = false;

      }
    });
  }

  onLogoutClick(){
    this.authService.logout();
    this.flashmessagesService.show('You are logged out', {cssClass: "alert-success", timeout: 3333});
    this.router.navigate(['/login'])

  }

}
