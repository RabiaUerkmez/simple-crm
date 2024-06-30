import { Component, inject } from '@angular/core';
import { Firestore, collection, collectionData, doc, onSnapshot } from '@angular/fire/firestore';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.class';
import { MatIcon } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIcon, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userId = '';
  user: User = new User();


  firestore: Firestore = inject(Firestore);

  constructor(private route: ActivatedRoute) {
    this.route.params.subscribe(params => {
      this.userId = params['id'];
      console.log('Test ID:', this.userId);

      this.getUser();
    });
  }

  getUser() {
    onSnapshot(doc(collection(this.firestore, 'users'), this.userId), ((user) => {
      this.user = new User(user.data())
      console.log('Das ist jetzt mein aktueller User: ', this.user);
    }))
  }

  editName() {

  }

  editMenu() {

  }

}
