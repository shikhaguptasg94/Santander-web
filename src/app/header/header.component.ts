import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth/auth.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthenticated =false;
  subscription : Subscription;
  constructor(private ds: DataStorageService, private authServ: AuthService){}
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  ngOnInit() {
    this.authServ.user.subscribe(
      user =>{
        this.isAuthenticated = !!user;
      }
    )
  }
  saveRecipes(){
    this.ds.storeRecipe().subscribe(
      (result) =>{
        console.log(result)
      }
    )
  }
  fetchRecipes(){
    this.ds.fetchRecipe().subscribe();
  }
  onLogout(){
    this.authServ.signOut()
  }
}
