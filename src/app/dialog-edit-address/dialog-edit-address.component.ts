import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { User } from '../../models/user.class';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { Firestore, collection, doc, setDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [FormsModule,
    MatDialogContent,
    MatFormFieldModule,
    MatProgressBarModule,
    MatDialogActions,
    MatDialogTitle,
    MatButtonModule,
    CommonModule,
    MatInputModule],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  user!: User;
  loading = false;
  userId!: string;

  firestore: Firestore = inject(Firestore);

  constructor(public dialogRef: MatDialogRef<DialogEditAddressComponent>) {

  }
  saveUser() {
    this.loading = true;
    setDoc(doc(collection(this.firestore, 'users'), this.userId), this.user.toJSON()).then((result) => {
      this.loading = false;
      this.dialogRef.close();      
    })
  }
}

