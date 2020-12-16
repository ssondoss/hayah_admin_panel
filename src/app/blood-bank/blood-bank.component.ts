import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { firestore } from 'firebase';

@Component({
  selector: 'app-blood-bank',
  templateUrl: './blood-bank.component.html',
  styleUrls: ['./blood-bank.component.css', '../app.component.css'],
})
export class BloodBankComponent implements OnInit {
  formData: FormGroup;
  BloodBanksValues: any;
  user: any;

  constructor(
    public formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.user = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    if (this.user == null || this.user == undefined || this.user == {}) {
      this.router.navigate(['/login']);
    }
    this.BloodBanksValues = firestore
      .collection('blood-bank-admin')
      .valueChanges();
  }

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

  add() {
    let ref = this.firestore.doc<any>(
      'blood-bank-admin/' + this.formData.controls['username'].value
    );
    ref.set({
      contactName: this.formData.controls['hospitalName'].value,
      phoneNumber1: this.formData.controls['phoneNumber1'].value,
      phoneNumber2: this.formData.controls['phoneNumber2'].value,
      phoneNumber3: this.formData.controls['phoneNumber3'].value,
      username: this.formData.controls['username'].value,
      password: this.formData.controls['password'].value,
      city: this.formData.controls['city'].value,
      hospital: this.formData.controls['hospitalAddress'].value,
    });
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

  makeId(length): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}
