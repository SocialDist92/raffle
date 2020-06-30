import {Component, OnInit} from '@angular/core';
import {SessionService} from "../shared/services/session.service";
import {ApiEndpointsService} from "../shared/services/api-endpoints.service";
import {ApiHttpService} from "../shared/services/api-http.service";
import {ParticipantsService} from "../shared/services/participants.service";
import {Participant} from "../shared/models/participant";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  token: string;
  activeSession: boolean = false;
  private toPayParticipants: Participant[] = [];
  private participants: Participant[] = [];

  constructor(private sessionService: SessionService, private apiHttpService: ApiHttpService,
              private apiEndpointsService: ApiEndpointsService, private participantsService: ParticipantsService,
            ) {
  }


  ngOnInit(): void {

    this.sessionService.getSessionActive().subscribe(active => {
      this.activeSession = active;

      if (this.activeSession) {

        this.apiHttpService.get(this.apiEndpointsService.getToPayParticipantsEndpoint('guitarra'),
          {headers: {Authorization: 'Bearer ' + this.sessionService.getSessionToken()}}).subscribe(data => {
          if ((data as any).success) {

            this.toPayParticipants = [];
            (data as any).toPays.forEach(toPay => {

              this.toPayParticipants.push({
                id: toPay._id,
                name: toPay.participant.name,
                lastName: toPay.participant.lastName,
                phone: toPay.participant.phone,
                number: toPay.participant.number
              })
            });

            this.participantsService.updateToPayParticipants(this.toPayParticipants);
          }
        })

        this.apiHttpService.get(this.apiEndpointsService.getParticipantsEndpoint('guitarra'),
          {headers: {Authorization: 'Bearer ' + this.sessionService.getSessionToken()}}).subscribe(data => {
          if ((data as any).success) {
            this.participants = [];
            (data as any).raffle.participants.forEach(participant => {

              this.participants.push({
                name: participant.name,
                lastName: participant.lastName,
                phone: participant.phone,
                number: participant.number
              })
            });

            this.participantsService.updateParticipants(this.participants);
          }
        })

      }
    });

    this.token = this.sessionService.getSessionToken();
    if (this.token) {
      if (this.sessionService.isSessionTokenValid(this.token)) this.sessionService.setSessionActive(true);
      else this.sessionService.setSessionActive(false);

    } else {
      this.sessionService.setSessionActive(false);
    }
  }

}
