import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {NumbersService} from '../shared/services/numbers.service';
import {Participant} from '../shared/models/participant';
import {Number} from '../shared/models/number';
import {ApiEndpointsService} from "../shared/services/api-endpoints.service";
import {ApiHttpService} from "../shared/services/api-http.service";


@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.sass']
})
export class AddParticipantComponent implements OnInit {
  participantForm: FormGroup;
  numbers: string[] = [];
  addSuccess: boolean = false;


  constructor(private numbersService: NumbersService,
              private apiEndpointsService: ApiEndpointsService,
              private apiHttpService: ApiHttpService) {

  }

  hasError = (controlName: string, errorName: string) => {

    return this.participantForm.controls[controlName].hasError(errorName);


  };

  ngOnInit(): void {
    this.numbersService.getAvailableNumbers().subscribe(numbers => this.numbers = numbers);

    this.participantForm = new FormGroup({
      name: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)]),
      number: new FormControl(this.numbers, [Validators.required])
    });

  }


  newRegister(): void {
    this.numbers = [];
    this.numbersService.requestAvailableNumbers();

    this.participantForm.setValue({
      name: '', lastName: '', phone: '', number: null
    });
    this.addSuccess = false;
  }


  createParticipant(): void {
    const reqData = {
      raffle: 'guitarra'
    };
    for (let attr in this.participantForm.value) {
      reqData[attr] = this.participantForm.value[attr].toLowerCase();
    }
    this.apiHttpService.post(this.apiEndpointsService.getAddToPayParticipantEndpoint(), reqData).subscribe(data => {
      if ((data as any).success) {
        this.addSuccess = true;
      }
    })
  }


}
