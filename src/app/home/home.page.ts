import {Component, OnInit} from '@angular/core';
import {Item} from './item-details/item.model';
import {MenuController} from '@ionic/angular';
import {ItemDetailsService} from './item-details/item-details.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
  item: Item[];
  iconSetting = true;
  constructor(
      private menuCtrl: MenuController,
      private itemDS: ItemDetailsService
  ) {}
  async openMenu(){
    await this.menuCtrl.enable(true, 'menu1');
    await this.menuCtrl.open('menu1');
  }
  IconSetting(){
    if (this.iconSetting){
      this.iconSetting = false;
    }else {
      this.iconSetting = true;
    }
  }
  ngOnInit() {
    this.item = this.itemDS.getAllItems();
  }
  ionViewWillEnter(){
    this.item = this.itemDS.getAllItems();
  }
}
