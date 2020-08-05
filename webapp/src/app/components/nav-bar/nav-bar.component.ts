import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public email: string;
  public isAdmin: boolean;
  public isLoggedIn: boolean;

  constructor (
    public auth: AuthenticationService,
  ) { }

  public ngOnInit () {
    this.auth.login$.subscribe(value => {
      this.isAdmin = true; // TODO
      this.isLoggedIn = value.loggedIn;
      this.email = value.email;
      console.log(value);
    });
  }

  public ngOnDestroy () {
    this._subscription.unsubscribe();
  }

  public onLogoutClick () {
    this.auth.logout()
      .subscribe(
        () => { },
        err => {
          console.error('Error while logging out:', err);
        }
      );
  }
}
