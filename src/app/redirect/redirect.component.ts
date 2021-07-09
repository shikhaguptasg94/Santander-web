import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html'
})
export class RedirectComponent {
  constructor(private ds: DataStorageService){}
  redirectMe(){
     // window.location.href = "https://angular.io/docs";
  }
}
