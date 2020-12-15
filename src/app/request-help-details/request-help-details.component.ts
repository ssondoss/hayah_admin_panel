import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
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

  constructor(
    public afs: AngularFirestore,
    private route: ActivatedRoute,
    private router: Router
  ) {
    let user = JSON.parse(localStorage.getItem('currentSharekAdmin'));
    console.log(user);
    if (user == null || user == undefined || user == {}) {
      this.router.navigate(['/login']);
    } else {
      this.route.queryParams.subscribe((params) => {
        this.requestId = params['id'];
        console.log(this.requestId);
        this.requestId = this.requestId.trim();
        this.itemDoc = this.afs.doc<any>('donation-request/' + this.requestId);
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
      let itemDoc = this.afs.doc<any>('accepted-donations/' + element.id);
      itemDoc.set(element);
      this.router.navigate(['/request-help']);
    });
  }

  rejectDonaitionRequest(request) {
    request.subscribe((element) => {
      this.deleteFromTheRequests(element.id);
      let itemDoc = this.afs.doc<any>('accepted-donations/' + element.id);
      itemDoc.set(element);
      this.router.navigate(['/request-help']);
    });
  }

  deleteFromTheRequests(id: string): void {
    let itemDoc = this.afs.doc<any>('donation-request/' + id);
    itemDoc.delete();
  }
}
