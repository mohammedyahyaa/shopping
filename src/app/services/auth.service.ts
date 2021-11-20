import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, switchMapTo } from 'rxjs/operators';
import { UserService } from './user.service';
import { UserInfo } from './userInfo';







@Injectable({
  providedIn: 'root'
})
export class AuthService {



  user$: Observable<firebase.User | null>;


  constructor(public afAuth: AngularFireAuth, private route: ActivatedRoute, private userSrv: UserService) {
    this.user$ = afAuth.authState;

  }

  login() {

    // let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    // localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
  }


  logout() {
    //console.log(this.user?.displayName);
    this.afAuth.auth.signOut();
    console.log(`logging out `);

  }

  get AppUser$(): Observable<any> {
    return this.user$
      .pipe(
        switchMap(user => this.userSrv.getUser(user!.uid)),
        map(appUser => appUser.isAdmin)
      )
  }



}
