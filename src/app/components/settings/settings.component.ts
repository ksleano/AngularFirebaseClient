import { Settings } from './../../models/Settings';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { SettingsService } from './../../services/settings.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  settings:Settings;

  constructor(
    public settingsService:SettingsService,
    public router:Router,
    public flashMessagesService:FlashMessagesService,
  ) { }

  ngOnInit() {
    this.settings = this.settingsService.getSettings();
  }

  onSubmit(){
    this.settingsService.changeSettings(this.settings);
    this.flashMessagesService.show('Settings Saved', {cssClass:"alert-success", timeout:4000});
    this.router.navigate(['/settings']);
  }

}
