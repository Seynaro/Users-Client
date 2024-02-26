import {Component, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users-service.service";
import {AsyncPipe, NgForOf} from "@angular/common";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    NgForOf
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit {

  users!: User[]

  constructor(private usersService: UsersService) {
  }

  ngOnInit(): void {
    this.loadUsers();

  }

  loadUsers(): void {
    this.usersService.fetchUsers().subscribe(users => {
        this.users = users;
        console.log(users)
      },
      error => {
        console.error('Error fetching users:', error);
      }
    )
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.usersService.deleteUser(userId);
  }

}
