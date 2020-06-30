import {Component, OnInit, ViewChild, OnDestroy} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Participant} from "../shared/models/participant";
import {ParticipantsService} from "../shared/services/participants.service";
import {ApiHttpService} from "../shared/services/api-http.service";
import {ApiEndpointsService} from "../shared/services/api-endpoints.service";
import {SessionService} from "../shared/services/session.service";


/**
 * @title Data table with sorting, pagination, and filtering.
 */
@Component({
  selector: 'app-to-add',
  templateUrl: './to-add.component.html',
  styleUrls: ['./to-add.component.sass']
})
export class ToAddComponent implements OnInit {
  displayedColumns: string[] = ['number', 'name', 'lastName', 'phone', 'action'];
  dataSource: MatTableDataSource<Participant>;
  toPayParticipants: Participant[];
  participants: Participant[];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private participantsService: ParticipantsService,
              private apiHttpService: ApiHttpService,
              private apiEndpointService: ApiEndpointsService,
              private sessionService: SessionService) {

  }

  ngOnInit() {


    this.participantsService.getParticipants().subscribe(participants => {
      this.participants = participants;
    });


    this.participantsService.getToPayParticipants().subscribe(participants => {
      this.toPayParticipants = participants;
      this.dataSource = new MatTableDataSource(this.toPayParticipants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }


  addToRaffle(participant: Participant): void {
    this.apiHttpService.post(this.apiEndpointService.getAddToPayParticipantToRaffleEndpoint(),
      {
        id: participant.id,
        raffle: 'guitarra'
      }, {headers: {Authorization: 'Bearer ' + this.sessionService.getSessionToken()}})
      .subscribe(data => {
        /*We receive the participants array here*/
        if ((data as any).success) {
          this.toPayParticipants = this.toPayParticipants.filter(el => el.id !== participant.id);
          this.participantsService.updateToPayParticipants(this.toPayParticipants);
          this.participantsService.updateParticipants([...this.participants, participant])
        }
      });
  }

  deleteToAdd(id: string): void {
    this.apiHttpService.post(this.apiEndpointService.getDeleteToPay(), {id},
      {headers: {Authorization: 'Bearer ' + this.sessionService.getSessionToken()}})
      .subscribe(data => {
        if ((data as any).success) {
          this.toPayParticipants = this.toPayParticipants.filter(el => el.id !== id);
          this.participantsService.updateToPayParticipants(this.toPayParticipants);
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }


  }
}






