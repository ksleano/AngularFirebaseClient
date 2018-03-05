import { Observable } from 'rxjs';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {

  constructor(
    public afAuth:AngularFireAuth,
  ) { }

  login(email:string, password:string){
    return new Promise((resolve, reject) =>{
      this.afAuth.auth.signInWithEmailAndPassword(email, password)
        .then(userData => resolve(userData), err => reject(err));
    });
  }

  // Check User Status
  getAuth(){
    // returns an observable
    return this.afAuth.authState.map(auth => auth)
  }

  // Logout User
  logout(){
    this.afAuth.auth.signOut();
  }

  // Register new user
  register(email:string, password:string){
    return new Promise((resolve, reject) =>{
      this.afAuth.auth.createUserWithEmailAndPassword(email, password)
        .then(
          userData => resolve(userData), 
          err => reject(err));
    });
  } 
}
