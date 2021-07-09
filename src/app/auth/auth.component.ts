import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './auth.component.html'
})
export class AuthComponent {
    isLoginMode=true;
    isLoading=false;
    error = null;
  constructor(private authServ: AuthService, private route: Router){}
  onSwich(){
      this.isLoginMode= !this.isLoginMode;
  }
  onSubmit(form: NgForm){
    if(!form.valid){
      return
    }
      const email = form.value.email;
      const password = form.value.password;
      let authObserv : Observable<AuthResponseData>
      this.isLoading = true;
      if(this.isLoginMode){
        authObserv = this.authServ.signIn(email, password);
      }else{
        authObserv = this.authServ.signUp(email, password);
      }
      authObserv.subscribe(
        res =>{
          this.isLoading = false;
          this.route.navigate(['/recipe'])
        },
        errorMessage =>{
          this.isLoading = false;
          this.error = errorMessage;
          
        }
      );
      form.reset()
  }
}
