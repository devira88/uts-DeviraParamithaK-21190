import { Injectable } from '@angular/core';
import {About} from './about.model';

@Injectable({
  providedIn: 'root'
})
export class AboutAppService {
  private about: About[] = [
    {
      foto: 'https://fiverr-res.cloudinary.com/t_profile_original,q_auto,f_auto/attachments/profile/photo/2154d2030c9a1db56a7dea108de1c35c-1589788673614/b8f50b93-04cd-4c86-9c44-3106f4e9e603.jpg'
    }
  ];
  constructor() { }

  getAllItems(){
    return [...this.about];
  }
}
