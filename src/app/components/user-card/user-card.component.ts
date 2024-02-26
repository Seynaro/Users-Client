import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  @Input() user!: User;
  @Output() deleteUser: EventEmitter<number> = new EventEmitter<number>()

  onDelete() {
    this.deleteUser.emit(this.user.id)
  }
}
