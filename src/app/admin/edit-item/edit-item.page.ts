import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ItemDetailsService} from '../../home/item-details/item-details.service';
import {AlertController, LoadingController, ToastController} from '@ionic/angular';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.page.html',
  styleUrls: ['./edit-item.page.scss'],
})
export class EditItemPage implements OnInit {
  itemDetails;
  editedNama: string;
  editedFoto: string;
  editedModel: string;
  editedHarga: number;
  editedStok: number;
  editedBaseClock: string;
  editedBoostClock: string;
  editedCore: string;
  editedThread: string;
  editedSpeed: string;
  editedUkuran: string;
  editedChipset: string;
  editedmerkProcessor: string;
  constructor(
      private activatedRoute: ActivatedRoute,
      private itemDS: ItemDetailsService,
      private router: Router,
      private alertCtrl: AlertController,
      private toastCtrl: ToastController,
      private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (paramMap.has('id')){
        const id = paramMap.get('id');
        this.itemDetails = this.itemDS.getItem(id);
        this.editedFoto = this.itemDetails.foto;
        this.editedNama = this.itemDetails.nama;
        this.editedModel = this.itemDetails.model;
        this.editedHarga = this.itemDetails.harga;
        this.editedStok = this.itemDetails.stok;
        this.editedBaseClock = this.itemDetails.deskripsi.baseClock;
        this.editedBoostClock = this.itemDetails.deskripsi.boostClock;
        this.editedCore = this.itemDetails.deskripsi.jumlahCore;
        this.editedThread = this.itemDetails.deskripsi.thread;
        this.editedSpeed = this.itemDetails.deskripsi.speed;
        this.editedUkuran = this.itemDetails.deskripsi.ukuran;
        this.editedChipset = this.itemDetails.deskripsi.chipset;
        this.editedmerkProcessor = this.itemDetails.deskripsi.merkProcessor;
      }else {
        return;
      }
    });
  }
  // edit item, dan akan menavigate ke admin (jika sukses)
  editItem(){
    this.presentLoading().then(() => {
      this.itemDS.editItem(
          this.itemDetails.id,
          this.editedFoto,
          this.editedNama,
          this.editedModel,
          this.editedHarga,
          this.editedStok,
          this.editedBaseClock,
          this.editedBoostClock,
          this.editedCore,
          this.editedThread,
          this.editedSpeed,
          this.editedUkuran,
          this.editedChipset,
          this.editedmerkProcessor
      );
      this.router.navigate(['/admin']);
      this.editToast();
    });
  }
  // alert untuk cornfimasi edit item
  async confirmEdit() {
    const alert = await this.alertCtrl.create({
      header: 'Edit Item',
      message: 'Save Changes?',
      buttons: [
        {
          text: 'Yes',
          handler: () => this.editItem()
        },
        {
          text: 'No',
          role: 'cancel'
        }
      ]
    });
    await alert.present();
  }
  // toast ketika selesai edit
  async editToast() {
    const toast = await this.toastCtrl.create({
      message: 'Item successfully edited.',
      duration: 3000,
      color: 'warning'
    });
    toast.present();
  }
  // Loading saat edit item
  async presentLoading() {
    const loading = await this.loadingCtrl.create({
      message: 'Editing item',
      duration: 3000
    });
    await loading.present();
    const {role, data} = await loading.onDidDismiss();
    console.log('loading dismissed!');
  }
}
