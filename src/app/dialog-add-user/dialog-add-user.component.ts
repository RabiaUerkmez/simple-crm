import { Component } from '@angular/core';
import { MatDialogContent, MatDialogActions, MatDialogTitle } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCalendar, MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDividerModule } from '@angular/material/divider';
import { User } from '../../models/user.class';
import { FormsModule } from '@angular/forms'


@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  imports: [FormsModule, MatDialogContent, MatDialogActions, MatButtonModule, MatDividerModule, MatDialogTitle, MatInputModule, MatFormFieldModule, MatDatepickerModule, MatCalendar, MatIconModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class DialogAddUserComponent {

  user = new User();
  birthDate!: Date;

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log('Current user: ', this.user);
    
  }
}
