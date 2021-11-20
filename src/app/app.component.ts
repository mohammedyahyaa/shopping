import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService } from './services/auth.service';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-card';

  constructor(private authServ: AuthService,
    private route: ActivatedRoute,
    router: Router,
    private userServ: UserService) {

    this.authServ.user$.subscribe(user => {
      if (user) {
        this.userServ.save(user);
        let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
        router.navigateByUrl(returnUrl);
      }

    })

  }
}
