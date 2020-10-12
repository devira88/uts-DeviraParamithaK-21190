import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemDetailsService} from './item-details.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {Item} from './item.model';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.page.html',
  styleUrls: ['./item-details.page.scss'],
})
export class ItemDetailsPage implements OnInit {
  itemDetails: Item;
  constructor(
      private activatedRoute: ActivatedRoute,
      private itemDS: ItemDetailsService,
      private router: Router,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }
  // Mengambil data berdasarkan itemId
  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has('id')){
        return;
      }
      const id = paramMap.get('id');
      this.itemDetails = this.itemDS.getItem(id);
      console.log(this.itemDetails);
    });
  }
  // Menghapus item
  deleteItem(){
    this.presentLoading().then(() => {
      this.itemDS.deleteItem(this.itemDetails.id);
      this.router.navigate(['/home']);
      this.presentToast();
    });
  }
  // Alert untuk confirm delete item
  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Delete Item',
      backdropDismiss: false,
      message: 'Are you sure you want to delete this item?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.deleteItem()
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
  async presentLoading(){
    const loading = await this.loadingCtrl.create({
      message: 'Deleting Item',
      duration: 3000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('loading dismissed!');
  }
}
