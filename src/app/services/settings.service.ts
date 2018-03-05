import { Settings } from './../models/Settings';
import { Injectable } from '@angular/core';

@Injectable()
export class SettingsService {
  // default settings
  settings:Settings = {
    allowRegistration:true,
    disableBalanceOnAdd:true,
    disableBalanceOnEdit:true
  }

  constructor() {
    if(localStorage.getItem('settings')!=null){
      this.settings = JSON.parse(localStorage.getItem('settings'));
    }
   }

  // methods
  getSettings(){
    return this.settings;
  }

  // store in local storage. Convert to string first or something
  changeSettings(settings:Settings){
    localStorage.setItem('settings', JSON.stringify(settings));
  }
}
