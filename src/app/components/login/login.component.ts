import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email:string;
  password:string;

  constructor(
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit() { 
  }

  onSubmit(){
    // if it resolves it goes to .then
    // if its an error it foes to .catch
    this.authService.login(this.email, this.password)
    .then((response) =>{
      this.flashMessagesService.show('You are logged in', {cssClass: 'alert-success', timout: 3333});
      this.router.navigate(['/'])
    })
    .catch((error)=>{
      this.flashMessagesService.show(error.message, {cssClass: 'alert-danger', timout: 3333});
      this.router.navigate(['/login']);
    });
  }

}
