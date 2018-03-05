import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Rx' 
import 'rxjs/add/operator/map';

@Injectable()
export class AuthGuard implements CanActivate{
    constructor(
        private router:Router,
        public afAuth:AngularFireAuth
    ){}
    
    canActivate():Observable<boolean>{
       return this.afAuth.authState.map(auth =>{
           if(!auth){
               // not authenticated, go to login
               this.router.navigate(['/login']);
               return false;
           }else{
               // yea go ahead
               return true;
           }
       });
    }
}

