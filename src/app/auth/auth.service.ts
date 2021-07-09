import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { User } from "./user.model";

export interface AuthResponseData{
    kind: string
    idToken: string;
    email:  string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered? : boolean;
}
@Injectable({providedIn: 'root'})
export class AuthService{
    //user = new Subject<User>();
    user = new BehaviorSubject<User>(null);
    tokenExpireTimer:any;
    constructor(private http: HttpClient, private route: Router){}
    signUp(email: string, password: string){
        return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyCFC1xN5GzcCCpFBgxJDUuepxx8FMkCVNo',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError( this.handleError), tap( respData => {
            this.handleAuthentication(respData.email, respData.localId,respData.idToken, +respData.expiresIn)
        }))
    }
    signIn(email: string, password: string){
        return this.http.post<AuthResponseData>('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyCFC1xN5GzcCCpFBgxJDUuepxx8FMkCVNo',
        {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(catchError( this.handleError), tap( respData => {
            this.handleAuthentication(respData.email, respData.localId,respData.idToken, +respData.expiresIn)
        }))
    }

    signOut(){
        this.user.next(null)
        this.route.navigate(['/auth'])
        localStorage.removeItem('userData')
        if(this.tokenExpireTimer){
            clearTimeout(this.tokenExpireTimer)
            this.tokenExpireTimer = null;
        }
    }
    autoLogin(){
        const userData :{
             email: string;
             id: string;
             _token : string;
             _tokenExpressionDate: string;
        }= JSON.parse(localStorage.getItem('userData'));
        if(!userData){
            return;
        }
        const loadData = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpressionDate));
        if(loadData.token){
             this.user.next(loadData);
             const expireintime = new Date(userData._tokenExpressionDate).getTime() - new Date().getTime();
             this.autoLogout(expireintime);
        }
    }

    autoLogout(expiresInTiome: number){
        this.tokenExpireTimer = setTimeout(() =>{
            this.signOut();
        },expiresInTiome)
    }

    private handleAuthentication(email:string, localId:string, idToken:string, expiresIn:number){
        const expirationDate = new Date(new Date().getTime() + expiresIn *1000)
        const user = new User(email, localId, idToken, expirationDate);
        this.user.next(user);
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData',JSON.stringify(user))
    }
    
    private handleError(errorRes:HttpErrorResponse){
        let errorMessage = 'A unknown error occured!'                                                              
        if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage)
        }
        switch(errorRes.error.error.message){
            case 'EMAIL_EXISTS' :
            errorMessage = 'This email address is already exsist!';
            break;
            case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email address is already exsist!';
            break;
            case 'INVALID_PASSWORD':
            errorMessage = 'This is invalid password!';
            break;
        }
        return throwError(errorMessage)
    }
}
