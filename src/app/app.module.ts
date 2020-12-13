import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BloodBankComponent } from './blood-bank/blood-bank.component';
import { RequestHelpComponent } from './request-help/request-help.component';
import { RequestHelpDetailsComponent } from './request-help-details/request-help-details.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { NotificationDetailsComponent } from './notification-details/notification-details.component';
import { EditBloodBankComponent } from './edit-blood-bank/edit-blood-bank.component';
import { RejectedRequestHelpComponent } from './rejected-request-help/rejected-request-help.component';
import { ApprovedRequestHelpComponent } from './approved-request-help/approved-request-help.component';
import { ApprovedRequestHelpDetailsComponent } from './approved-request-help-details/approved-request-help-details.component';
import { RejectedRequestHelpDetailsComponent } from './rejected-request-help-details/rejected-request-help-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PopoverModule } from 'ngx-smart-popover';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    HomeComponent,
    BloodBankComponent,
    RequestHelpComponent,
    RequestHelpDetailsComponent,
    NotificationsComponent,
    NotificationDetailsComponent,
    EditBloodBankComponent,
    RejectedRequestHelpComponent,
    ApprovedRequestHelpComponent,
    ApprovedRequestHelpDetailsComponent,
    RejectedRequestHelpDetailsComponent,
  ],
  imports: [
    BrowserModule,
    PopoverModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
