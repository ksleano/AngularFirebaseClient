import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages'; 

// AngularFire Imports
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

// Component Imports
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AddClientComponent } from './components/add-client/add-client.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

//Service imports
import { ClientService } from './services/client.service';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { SettingsService } from './services/settings.service';
import { RegisterGuard } from './guards/register.guard';



const appRoutes: Routes = [
  {path:'' , component:DashboardComponent, canActivate:[AuthGuard]},
  {path:'register' , component:RegisterComponent, canActivate:[RegisterGuard]},
  {path:'login' , component:LoginComponent},
  {path:'add-client', component:AddClientComponent, canActivate:[AuthGuard]},
  {path:'client/:id' , component:ClientDetailsComponent, canActivate:[AuthGuard]},
  {path:'edit-client/:id' , component:EditClientComponent, canActivate:[AuthGuard]},
  {path:'settings', component:SettingsComponent, canActivate:[AuthGuard]},
  {path:'**', component:PageNotFoundComponent}
  
];

export const firebaseConfig = {
  apiKey: "AIzaSyBJgYAi_UyCJhkAuolfYjioo95Ik0K-olI",
  authDomain: "fir-client-5e2cd.firebaseapp.com",
  databaseURL: "https://fir-client-5e2cd.firebaseio.com",
  projectId: "fir-client-5e2cd",
  storageBucket: "fir-client-5e2cd.appspot.com",
  messagingSenderId: "716443613244"
}


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    ClientsComponent,
    ClientDetailsComponent,
    AddClientComponent,
    EditClientComponent,
    NavbarComponent,
    SidebarComponent,
    LoginComponent,
    RegisterComponent,
    SettingsComponent,
    PageNotFoundComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig),
    FlashMessagesModule
    
  ],
  providers: [
    AngularFireAuth,
    AngularFireDatabase,
    ClientService,
    AuthService,
    AuthGuard,
    RegisterGuard,
    SettingsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
