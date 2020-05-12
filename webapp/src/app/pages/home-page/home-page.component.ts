import { Component, OnInit } from '@angular/core';
import { BalanceService } from 'src/app/services/balance.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public balance: number;

  constructor (
    private balanceService: BalanceService,
  ) { }

  public ngOnInit(): void {
    this.balanceService.getBalance()
      .subscribe(res => {
        this.balance = res.balance;
      },
      err => {
        console.error('HomePageComponent :: ngOnInit :: Error retrieving balance '
          + `from API: ${err}`);
      });
  }
}
