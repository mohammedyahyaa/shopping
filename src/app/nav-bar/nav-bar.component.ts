import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { UserInfo } from '../services/userInfo';

@Component({
  selector: 'nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {








  constructor(public service: AuthService, private db: AngularFireDatabase) {


    // this.authServ.AppUser();
    //this.service.AppUser$;
    this.service.AppUser$;
    // console.log(this.userApp.isAdmin);


  }


  logout() {
    //console.log(this.service.user$);
    // console.log(`logging out`);
    // console.log(this.)
    this.service.logout();




  }





}



