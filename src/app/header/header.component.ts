import { Component, OnInit } from '@angular/core';
import {SessionService} from "../shared/services/session.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {
  public sessionActive: boolean;

  constructor(private sessionService: SessionService) { }

  logout(): void {
    this.sessionService.setSessionActive(false);

  }

  ngOnInit(): void {
    this.sessionService.getSessionActive().subscribe(active => this.sessionActive = active);
  }

}
