import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { DatabaseService } from './database';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Home', url: '/home', icon: 'home' },
    { title: 'Cities', url: '/cities', icon: 'map' },
    { title: 'Favourite', url: '/favourite', icon: 'heart' },
  ];
  constructor(
    public platform: Platform,
    public ds: DatabaseService) {
      this.platform.ready().then(()=>{
        this.ds.loadDatabase();
      });
    
  }

}
