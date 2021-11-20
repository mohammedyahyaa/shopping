import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import * as firebase from 'firebase';

import { AuthService } from './auth.service';
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class UserService {
  username: any;
  details: any;

  constructor(private db: AngularFireDatabase, private authSvr: AuthService) { }


  isAdmin: string | undefined;

  save(user: firebase.User) {

    this.db.object('/users/' + user.uid).update({
      name: user.displayName,
      email: user.email
    })
    // console.log(user.isAdmin);
  }


  getUser(uid: string): Observable<any> {
    return this.db.object('/users/' + uid).valueChanges();;
  }








  // get AppUser$(): Observable<userInfo | any> {
  //   return this.authSvr.user$.pipe(switchMapTo(user => {
  //     if (user) {
  //       //return this.getUser(user.uid).valueChanges();
  //     }
  //     else {
  //       // return Observable;
  //     }
  //   }))

  // }

}





