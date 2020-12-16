import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-edit-blood-bank',
  templateUrl: './edit-blood-bank.component.html',
  styleUrls: ['./edit-blood-bank.component.css', '../app.component.css'],
})
export class EditBloodBankComponent implements OnInit {
  formData: FormGroup;
  constructor(public formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      hospitalName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      hospitalAddress: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(500)]),
      ],
      city: ['', Validators.required],
      phoneNumber1: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber2: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      phoneNumber3: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(10),
        ]),
      ],
      username: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(50),
        ]),
      ],
    });
  }
}
