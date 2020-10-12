import { Component, OnInit } from '@angular/core';
import {Item} from '../home/item-details/item.model';
import {AlertController, IonItemSliding, LoadingController, MenuController, ToastController} from '@ionic/angular';
import {ItemDetailsService} from '../home/item-details/item-details.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  iconStatus;
  item: Item[];
  constructor(
      private menuCtrl: MenuController,
      private itemDS: ItemDetailsService,
      private router: Router,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.item = this.itemDS.getAllItems();
  }
  reload(){
    this.item = this.itemDS.getAllItems();
  }
  ionViewWillEnter(){
    this.item = this.itemDS.getAllItems();
  }
  // delete item
  delete(id, slidingItems){
    this.presentLoading().then(() => {
      this.itemDS.deleteItem(id);
      slidingItems.close();
      this.router.navigate(['/admin']);
      this.presentToast();
      this.reload();
    });
  }
  // edit item (sliding)
  edit(item: Item, slidingItems: IonItemSliding){
    slidingItems.close();
  }
  // Untuk membuka side menu
  async openMenu(){
    await this.menuCtrl.enable(true, 'menu1');
    await this.menuCtrl.open('menu1');
  }
  // Alert untuk confirm delete item
  async presentAlert(item: Item, slidingItems: IonItemSliding) {
    const alert = await this.alertCtrl.create({
      header: 'Delete Item',
      backdropDismiss: false,
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.delete(item.id, slidingItems)
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
 // Toast ketika sudah melakukan hapus item
  async presentToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item has been deleted',
      duration: 3000,
      position: 'middle',
      color: 'warning'
    });
    toast.present();
  }
  // Loading saat menghapus item
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Deleting Item',
      duration: 3000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('loading dismissed!');
  }
}
