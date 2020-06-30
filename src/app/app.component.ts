import {Component, OnInit} from '@angular/core';
import {NumbersService} from "./shared/services/numbers.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Rifa Fender 2020';

  constructor(private numbersService: NumbersService) {

  }

  ngOnInit() {
    this.numbersService.requestAvailableNumbers();

  }
}
