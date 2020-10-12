import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';
import {ItemDetailsService} from '../../home/item-details/item-details.service';

@Component({
  selector: 'app-new-item',
  templateUrl: './new-item.page.html',
  styleUrls: ['./new-item.page.scss'],
})
export class NewItemPage implements OnInit {
  newItem: FormGroup;
  lastId: number;
  jenis: string = null;
  constructor(
      private itemDS: ItemDetailsService,
      private router: Router,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    // mengambil semua data item
    this.lastId = this.itemDS.getAllItems().length;
    // isi form
    this.newItem = new FormGroup({
      foto: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      jenis: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      name: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      merek: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      model: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      harga: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      stok: new FormControl(null, {
        updateOn: 'blur',
        validators: [Validators.required],
      }),
      baseClock: new FormControl(null, {
        updateOn: 'change',
      }),
      boostClock: new FormControl(null, {
        updateOn: 'change',
      }),
      core: new FormControl(null, {
        updateOn: 'change',
      }),
      thread: new FormControl(null, {
        updateOn: 'change',
      }),
      speed: new FormControl(null, {
        updateOn: 'change',
      }),
      ukuran: new FormControl(null, {
        updateOn: 'change',
      }),
      chipset: new FormControl(null, {
        updateOn: 'change',
      }),
      merkProcessor: new FormControl(null, {
        updateOn: 'change',
      }),
    });
    console.log(this.lastId);
  }
  // Menambah item
  addItem(){
    this.presentLoading().then(() => {
      this.itemDS.addItem(this.lastId, this.newItem);
      this.router.navigate(['/admin']);
      this.addToast();
    });
  }
  // Alert untuk add item
  async confirmAdd() {
    const alert = await this.alertCtrl.create({
      header: 'Add Item',
      message: 'Are you sure the data is correct?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.addItem()
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
  // Toast success add item
  async addToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item successfully added.',
      duration: 3000,
      position: 'middle',
      color: 'warning'
    });
    toast.present();
  }
  // Loading saat add new item
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'is adding item',
      duration: 3000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('loading dismissed!');
  }
}
