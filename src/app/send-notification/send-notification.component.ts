import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-send-notification',
  templateUrl: './send-notification.component.html',
  styleUrls: ['./send-notification.component.css', '../app.component.css'],
})
export class SendNotificationComponent implements OnInit {
  formData: FormGroup;
  BloodBanksValues: any;
  user: any;
  checkAll = false;
  a_plus = false;
  b_plus = false;
  ab_plus = false;
  o_minus = false;
  a_minus = false;
  b_minus = false;
  ab_minus = false;

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
      .collection('accepted-requests')
      .valueChanges();
  }

  ngOnInit(): void {
    this.formData = this.formBuilder.group({
      contactName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
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
      username: [''],
      password: [''],
      city: [''],
      hospitalName: ['', Validators.required],
      hospitalAddress: ['', Validators.required],
      bloodUnitsCount: ['', Validators.required],
      notes: ['', Validators.required],
    });
  }

  add() {
    let ref = this.firestore.doc<any>(
      'blood-bank-admin/' + this.formData.controls['username'].value
    );
    ref.set({
      contactName: this.formData.controls['contactName'].value,
      phoneNumber1: this.formData.controls['phoneNumber1'].value,
      phoneNumber2: this.formData.controls['phoneNumber2'].value,
      phoneNumber3: this.formData.controls['phoneNumber3'].value,
      username: this.formData.controls['username'].value,
      password: this.formData.controls['password'].value,
      city: this.formData.controls['city'].value,
      hospital: this.formData.controls['hospital'].value,
    });
    this.formData = this.formBuilder.group({
      contactName: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(250)]),
      ],
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
      city: [''],
      hospitalName: ['', Validators.required],
      hospitalAddress: ['', Validators.required],
      bloodUnitsCount: ['', Validators.required],
      notes: ['', Validators.required],
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

  selectAll() {
    this.checkAll = !this.checkAll;
    console.log(this.checkAll);
  }
}
