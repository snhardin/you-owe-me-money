import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BalanceService } from 'src/app/services/balance.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { switchMap } from 'rxjs/operators';
import { Subscription, of } from 'rxjs';
import { BalanceServiceResponse } from 'src/app/services/balance.service.interface';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  private _subscription: Subscription;

  public balance: number;
  public loggedIn: boolean;

  constructor (
    public auth: AuthenticationService,
    private balanceService: BalanceService,
  ) { }

  public ngOnInit (): void {
    this._subscription = this.auth.login$
      .pipe(
        switchMap(loginState => {
          this.loggedIn = loginState.loggedIn;
          if (this.loggedIn) {
            return this.balanceService.getBalance();
          } else {
            return of(<BalanceServiceResponse>{ balance: 0 });
          }
        }),
      )
      .subscribe(response => {
        this.balance = response.balance;
      },
      (err: HttpErrorResponse) => {
        this.balance = undefined;
        if (err.status === 404) {
          console.error('HomePageComponent :: ngOnInit :: No balance found for user!');
        } else {
          console.error('HomePageComponent :: ngOnInit :: Error retrieving balance '
            + 'from API:', err);
        }
      });
  }

  public ngOnDestroy (): void {
    this._subscription.unsubscribe();
  }
}
