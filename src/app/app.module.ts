import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { TagInputModule } from 'ngx-chips';

import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AppComponent } from './app.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormComponent } from './components/users-table/user-form/user-form.component';
import { DataService } from './services/data.service';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [AppComponent, UsersTableComponent, UserFormComponent],
  imports: [
    BrowserModule,
    FormsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TagInputModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(environment.firebaseConfig)
  ],
  providers: [DataService],
  bootstrap: [AppComponent],
  entryComponents: [UserFormComponent]
})
export class AppModule {}
