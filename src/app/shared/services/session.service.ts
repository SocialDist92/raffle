// Angular Modules
import {Injectable} from '@angular/core';
import {JwtHelperService} from "@auth0/angular-jwt";
import {Observable, Subject} from "rxjs";


@Injectable()
export class SessionService {
  private sessionActive = new Subject<boolean>();


  constructor() {
  }

  public getSessionToken(): string {
    return localStorage.getItem('raffleAdminToken');
  }


  public setSessionActive(active: boolean, token?: string): void {
    if (active) {
      if (token) localStorage.setItem('raffleAdminToken', token);
    } else delete localStorage['raffleAdminToken'];

    this.sessionActive.next(active);
  }

  public getSessionActive(): Observable<boolean> {

    return this.sessionActive.asObservable();
  }

  public isSessionTokenValid(token: string): boolean {
    const helper = new JwtHelperService();

    return !helper.isTokenExpired(token);


  }


}
