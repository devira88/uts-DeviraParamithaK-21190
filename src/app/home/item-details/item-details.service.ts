import { Injectable } from '@angular/core';
import {Item} from './item.model';
import {FormGroup} from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ItemDetailsService {
  private item: Item[] = [
    {
      id: '001',
      nama: 'Intel Core i9',
      jenis: 'CPU',
      foto: 'https://www.computeruniverse.net/images/1000/907471339A43D8C195B9428C95A2CBBC.jpg',
      merek: 'Intel',
      model: '10900k',
      deskripsi: {
        baseClock: '3.7 Ghz',
        boostClock: '5.3 Ghz',
        jumlahCore: '10 Cores',
        thread: '20 Threads',
        speed: '',
        ukuran: '',
        chipset: '',
        merkProcessor: ''
      },
      harga:  8700000,
      stok: 5
    },
    {
      id: '002',
      nama: 'Gigabyte Aorus RGB',
      jenis: 'RAM',
      foto: 'https://www.gigabyte.com/FileUpload/Global/KeyFeature/1563/innergigabyteimages/mainpage.jpg',
      merek: 'Aorus',
      model: 'PC35200 DDR4',
      deskripsi: {
        baseClock: '',
        boostClock: '',
        jumlahCore: '',
        thread: '',
        speed: '4400 Mhz',
        ukuran: '16 GB',
        chipset: '',
        merkProcessor: ''
      },
      harga:  3400000,
      stok: 10
    },
    {
      id: '003',
      nama: 'Asus ROG Zenith II Extreme',
      jenis: 'MOTHERBOARD',
      foto: 'https://cf.shopee.co.id/file/a78d97b32c2ab321a1f964ebb31d0fb2',
      merek: 'Asus',
      model: 'Zenith II Extreme',
      deskripsi: {
        baseClock: '',
        boostClock: '',
        jumlahCore: '',
        thread: '',
        speed: '',
        ukuran: '',
        chipset: 'AMD TRX40',
        merkProcessor: 'AMD Ryzen Threadripper'
      },
      harga:  14750000,
      stok: 2
    },
    {
      id: '004',
      nama: 'Asus TUF RTX 3090 OC Edition',
      jenis: 'GPU',
      foto: 'https://www.asus.com/media/global/products/igxxollbqcnhl76a/P_setting_000_1_90_end_500.png',
      merek: 'Asus',
      model: 'TUF RTX 3090 OC Edition',
      deskripsi: {
        baseClock: '',
        boostClock: '',
        jumlahCore: '',
        thread: '',
        speed: '',
        ukuran: '',
        chipset: '',
        merkProcessor: ''
      },
      harga:  35500000,
      stok: 20
    },
    {
      id: '005',
      nama: 'ROG - Evo X ROG',
      jenis: 'RAM',
      foto: 'https://www.teckknow.com/wp-content/uploads/2017/09/GeIL-EVO-X-ROG-certified-RGB-Gaming-Memory-1.jpg',
      merek: 'Asus',
      model: 'Evo X ROG',
      deskripsi: {
        baseClock: '',
        boostClock: '',
        jumlahCore: '',
        thread: '',
        speed: 'PC-19200',
        ukuran: '16 GB',
        chipset: '',
        merkProcessor: ''
      },
      harga:  2600000,
      stok: 14
    }
  ];
  constructor() { }
  // mengambil semua item
  getAllItems(){
    return [...this.item];
  }
  // mengambil item berdasarkan item id
  getItem(id: string){
    return this.item.find(item => {
      return item.id === id;
    });
  }
  // delete item berdasarkan item id
  deleteItem(id){
    this.item = this.item.filter(item => {
      return item.id !== id;
    });
  }
  // menambah item
  addItem(id, data: FormGroup){
    const newid = id + 1;
    const pushData = {
      id: newid.toString(),
      nama: data.value.name,
      jenis: data.value.jenis,
      foto: data.value.foto,
      merek: data.value.merek,
      model: data.value.model,
      deskripsi: {
        baseClock: data.value.baseClock,
        boostClock: data.value.boostClock,
        jumlahCore: data.value.core,
        thread: data.value.thread,
        speed: data.value.speed,
        ukuran: data.value.ukuran,
        chipset: data.value.chipset,
        merkProcessor: data.value.merkProcessor
      },
      harga: data.value.harga,
      stok: data.value.stok
    };
    this.item.push(pushData);
  }
  editItem(id,
           foto,
           nama,
           model,
           harga,
           stok,
           baseClock,
           boostClock,
           jumlahCore,
           thread,
           speed,
           ukuran,
           chipset,
           merkProcessor){
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.item.length; i++){
      if (this.item[i].id === id){
        this.item[i].nama = nama;
        this.item[i].foto = foto;
        this.item[i].model = model;
        this.item[i].stok = stok;
        this.item[i].harga = harga;
        this.item[i].deskripsi.baseClock = baseClock;
        this.item[i].deskripsi.boostClock = boostClock;
        this.item[i].deskripsi.jumlahCore = jumlahCore;
        this.item[i].deskripsi.thread = thread;
        this.item[i].deskripsi.speed = speed;
        this.item[i].deskripsi.ukuran = ukuran;
        this.item[i].deskripsi.chipset = chipset;
        this.item[i].deskripsi.merkProcessor = merkProcessor;
      }
    }
  }
}
