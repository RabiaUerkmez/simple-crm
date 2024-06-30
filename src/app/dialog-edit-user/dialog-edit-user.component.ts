import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { User } from '../../models/user.class';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [FormsModule,
    MatDialogActions,
    MatDialogContent,
    MatDialogTitle,
    MatFormFieldModule,
    MatProgressBarModule,
    MatButtonModule,
    CommonModule,
    MatInputModule,
    MatDatepickerModule,
    MatCalendar,
    MatIconModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})
export class DialogEditUserComponent {
  user: User = new User();
  loading = false;
  birthDate!: Date;
  userId!: string;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditUserComponent>) {

  }

  saveUser() {
    this.loading = true;
    setDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON()).then((result) => {
      this.loading = false;
      this.dialogRef.close();      
    })
  }
}
