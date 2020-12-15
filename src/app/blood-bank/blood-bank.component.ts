import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
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

  constructor(
    public formBuilder: FormBuilder,
    private firestore: AngularFirestore,
    private router: Router
  ) {
    this.BloodBanksValues = firestore.collection('blood-bank').valueChanges();
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
      hospital: [''],
    });
  }

  add() {
    let id = this.makeId(20);
    let ref = this.firestore.doc<any>('blood-bank/' + id);
    ref.set({
      contactName: this.formData.controls['contactName'].value,
      phoneNumber1: this.formData.controls['phoneNumber1'].value,
      phoneNumber2: this.formData.controls['phoneNumber2'].value,
      phoneNumber3: this.formData.controls['phoneNumber3'].value,
      username: this.formData.controls['username'].value,
      password: this.formData.controls['password'].value,
      city: this.formData.controls['city'].value,
      hospital: this.formData.controls['hospital'].value,
      id: id,
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
      username: [''],
      password: [''],
      city: [''],
      hospital: [''],
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
