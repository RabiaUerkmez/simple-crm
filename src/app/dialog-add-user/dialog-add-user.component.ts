import { Component, inject } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogTitle, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms'
import { Firestore, collection, doc, addDoc } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDividerModule,
    MatDialogTitle,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatCalendar,
    MatIconModule,
    MatProgressBarModule
  ],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogAddUserComponent {

  user = new User();
  birthDate!: Date;
  loading = false;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogAddUserComponent>) { }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user: ', this.user);
    this.loading = true;
    addDoc(this.getUsersRef(), this.user.toJSON()).then((result) => {
      this.loading = false;
      this.dialogRef.close();
    })
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  // getSingleUserId(docId:string) {
  //   return doc(collection(this.firestore, 'users'), docId)
  // }
}
