import { Component, OnInit } from '@angular/core';
import {MenuController} from '@ionic/angular';
import {About} from './about.model';
import {AboutAppService} from './about-app.service';

@Component({
  selector: 'app-about-app',
  templateUrl: './about-app.page.html',
  styleUrls: ['./about-app.page.scss'],
})
export class AboutAppPage implements OnInit {
  about: About[];
  constructor(
      private menuCtrl: MenuController,
      private aboutAS: AboutAppService
  ) { }

  ngOnInit() {
    this.about = this.aboutAS.getAllItems();
  }
  async openMenu(){
    await this.menuCtrl.enable(true, 'menu1');
    await this.menuCtrl.open('menu1');
  }
}
