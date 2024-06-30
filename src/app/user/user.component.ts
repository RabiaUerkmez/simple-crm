import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { MatCardModule } from '@angular/material/card';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, CommonModule, RouterLink],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  user = new User();
  allUsers: User[] = [];
  unsubUserList;

  public dialog = inject(MatDialog);
  firestore: Firestore = inject(Firestore);

  constructor() {
    this.unsubUserList = this.subUserList();
  }

  subUserList() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.allUsers = [];
      list.forEach((element) => {

        let userData = {
          ...element.data(),
          id: element.id,
        };
        this.allUsers.push(new User(userData));
      });
    });
  }


  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent)
  }

  ngOnDestroy() {
    this.unsubUserList;
  }

}
