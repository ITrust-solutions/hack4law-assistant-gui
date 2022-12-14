import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShellComponent } from './shell/shell/shell.component';
import { AppRoutingModule } from './app.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { environment } from '../environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import { HttpCasesModule } from './cases/services/http/http-cases.module';
import { MatNativeDateModule } from '@angular/material/core';
import { CurrentUserService } from './user/services/current-user.service';
import { HttpUsersModule } from './user/services/http/http-users.module';

firebase.initializeApp(environment.firebase);

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        ShellComponent,
        AppRoutingModule,
        AngularFirestoreModule,
        MatDialogModule,
        MatNativeDateModule,
        CalendarModule.forRoot({
            provide: DateAdapter,
            useFactory: adapterFactory,
        }),
        HttpCasesModule,
        HttpUsersModule
    ],
  providers: [
      CurrentUserService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
