import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-help-details',
  templateUrl: './request-help-details.component.html',
  styleUrls: ['./request-help-details.component.css', '../app.component.css'],
})
export class RequestHelpDetailsComponent implements OnInit {
  disabledNotes = true;
  disabledSelect = true;
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
  constructor() {}

  ngOnInit(): void {}
}
