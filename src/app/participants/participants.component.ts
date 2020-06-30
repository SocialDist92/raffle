import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {Participant} from "../shared/models/participant";
import {ParticipantsService} from "../shared/services/participants.service";
import {ApiHttpService} from "../shared/services/api-http.service";
import {ApiEndpointsService} from "../shared/services/api-endpoints.service";
import {SessionService} from "../shared/services/session.service";

@Component({
  selector: 'app-participants',
  templateUrl: './participants.component.html',
  styleUrls: ['./participants.component.sass']
})
export class ParticipantsComponent implements OnInit {

  displayedColumns: string[] = ['number', 'name', 'lastName', 'phone', 'action'];
  dataSource: MatTableDataSource<Participant>;
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
      this.dataSource = new MatTableDataSource(this.participants);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    })
  }

  deleteParticipant(number: string): void {
    this.apiHttpService.post(this.apiEndpointService.getDeleteParticipant(), {
      raffle: 'guitarra',
      number
    }, {headers: {Authorization: 'Bearer ' + this.sessionService.getSessionToken()}})
      .subscribe(data => {
        if ((data as any).success) {
          this.participantsService.updateParticipants((data as any).raffle.participants);
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
