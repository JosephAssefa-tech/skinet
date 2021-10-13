import { Component, OnInit } from '@angular/core';

import {BasketService} from 'src/app/basket/basket.service';
import {IBasket} from 'src/app/shared/models/basket';
import {Observable}  from 'rxjs'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  basket$:Observable<IBasket>;

  constructor(private basketService: BasketService) { }

  ngOnInit() {
    this.basket$ = this.basketService.basket$;
  }

}
