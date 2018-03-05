import { AuthService } from './../../services/auth.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // local properties
  email:string;
  password:string;

  constructor(
    // inject dependencies
    private flashMessagesService:FlashMessagesService,
    private router:Router,
    private authService:AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(){
    this.authService.register(this.email, this.password)
      .then((response) => {
        this.flashMessagesService.show('New user Registered', {cssClass:'alert-success', timeout:4000});
        this.router.navigate(['/']);
      })
      .catch((error)=>{
        this.flashMessagesService.show('New user Registered', {cssClass:'alert-danger', timeout:4000});
        this.router.navigate(['/register']);
      });

  }

}
