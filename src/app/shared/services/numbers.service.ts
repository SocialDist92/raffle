import {Injectable} from '@angular/core';
import {Number as Ticket} from '../models/number';
import {ApiEndpointsService} from './api-endpoints.service';
import {ApiHttpService} from './api-http.service';
import {Observable, throwError, Subject} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';
import {NumbersResponse} from "../models/numbers-response";


@Injectable({
  providedIn: 'root'
})
export class NumbersService {
  private numbersResponse: NumbersResponse;
  private numbersArraySubject = new Subject<string[]>();

  constructor(private apiHttpService: ApiHttpService, private apiEndpointsService: ApiEndpointsService) {

  }

  requestAvailableNumbers() {
    this.apiHttpService.get(this.apiEndpointsService.getNumbersEndpoint('guitarra'))
      .subscribe(data => {
        this.numbersResponse = {
          success: (data as any).success,
          usedNumbers: (data as any).usedNumbers,
          availableNumbers: (data as any).availableNumbers

        };

        this.updateAvailableNumbers(this.numbersResponse.availableNumbers as string[]);

      });
  }

  getAvailableNumbers(): Observable<string[]> {
    return this.numbersArraySubject.asObservable();
  }

  updateAvailableNumbers(numbers: string[]) {

    this.numbersArraySubject.next(numbers);
  }
}
