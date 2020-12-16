import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2/dist/sweetalert2.js';

import {
  AngularFirestoreDocument,
  AngularFirestore,
} from '@angular/fire/firestore';
import { Router, ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
@Component({
  selector: 'app-request-help-details',
  templateUrl: './request-help-details.component.html',
  styleUrls: ['./request-help-details.component.css', '../app.component.css'],
})
export class RequestHelpDetailsComponent implements OnInit {
  disabledNotes = true;
  disabledSelect = true;
  requestId: any;
  editStatus() {
    this.disabledSelect = false;
  }
  confirmStatus() {
    this.disabledSelect = true;
  }
  confirmNotes() {
    this.disabledNotes = true;
  }
  editAditionalNotes() {
    this.disabledNotes = false;
  }
  itemDoc: AngularFirestoreDocument<any>;
  item: Observable<any>;
  userId: any;
  userDoc: AngularFirestoreDocument<any>;
  user: Observable<any>;
  currentUser: any;
  filteredBanks = [];
  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.filteredBanks.push('a');
    this.filteredBanks.push('b');
    this.filteredBanks.push('c');
    this.filteredBanks.push('d');
    this.currentUser = JSON.parse(localStorage.getItem('currentHayahAdmin'));
    console.log(this.currentUser);
    if (
      this.currentUser == null ||
      this.currentUser == undefined ||
      this.currentUser == {}
    ) {
      this.router.navigate(['/login']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.requestId = params['id'];
        console.log(this.requestId);
        this.requestId = this.requestId.trim();
        this.itemDoc = this.afs.doc<any>('new-requests/' + this.requestId);
        this.item = this.itemDoc.valueChanges();
        this.itemDoc.update({ viewed: true });
        this.item.subscribe((event) => {
          this.userId = event.user;
          console.log(this.userId);
          this.userDoc = this.afs.doc<any>('users/' + this.userId.trim());
          this.user = this.userDoc.valueChanges();
        });
      });
    }
  }

  ngOnInit(): void {}

  getImageURL(image) {
    if (image != null) {
      const url =
        'https://firebasestorage.googleapis.com/v0/b/hayah-28356.appspot.com/o/' +
        image.replace('/', '%2F') +
        '?alt=media&token=c9e474ba-bc13-4766-916c-109826f50701';
      return url;
    } else return '';
  }

  acceptDonaitionRequest(request) {
    request.subscribe((element) => {
      this.deleteFromTheRequests(element.id);
      let itemDoc = this.afs.doc<any>('accepted-requests/' + element.id);
      element.acceptedBy = this.currentUser.username;
      console.log(element);
      itemDoc.set(element);
      this.router.navigate(['/request-help']);
    });
  }

  rejectDonaitionRequest(request) {
    request.subscribe((element) => {
      this.deleteFromTheRequests(element.id);
      let itemDoc = this.afs.doc<any>('rejected-requests/' + element.id);
      Swal.fire({
        title: 'Are you sure want to remove?',
        text: 'You will not be able to recover this file!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        cancelButtonText: 'No, keep it',
      }).then((result) => {
        if (result.value) {
          Swal.fire(
            'Deleted!',
            'Your imaginary file has been deleted.',
            'success'
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your imaginary file is safe :)', 'error');
        }
      });
      element.rejectedBy = this.currentUser.username;
      itemDoc.set(element);
      this.router.navigate(['/request-help']);
    });
  }

  deleteFromTheRequests(id: string): void {
    let itemDoc = this.afs.doc<any>('new-requests/' + id);
    itemDoc.delete();
  }
}
