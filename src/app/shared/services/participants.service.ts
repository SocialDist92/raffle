import {Injectable} from '@angular/core';
import {Subject, Observable} from "rxjs";
import {Participant} from "../models/participant";

@Injectable({
  providedIn: 'root'
})
export class ParticipantsService {
  private toPayParticipants = new Subject<Participant[]>();
  private participants = new Subject<Participant[]>();

  constructor() {
  }


  getToPayParticipants(): Observable<Participant[]> {
    return this.toPayParticipants.asObservable();
  }

  updateToPayParticipants(participants: Participant[]): void {
    return this.toPayParticipants.next(participants);
  }

  getParticipants(): Observable<Participant[]> {
    return this.participants.asObservable();
  }

  updateParticipants(participants: Participant[]): void {
    return this.participants.next(participants);
  }
}
