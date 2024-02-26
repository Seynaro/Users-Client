import {Injectable} from '@angular/core';
import {catchError, Observable, tap} from "rxjs";
import {User} from "../models/user";
import {UsersApiService} from "./users-api-service.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  users: User[] = [];

  constructor(private usersApi: UsersApiService) {
  }

  fetchUsers(): Observable<User[]> {
    return this.usersApi.getUsers().pipe(
      tap(users => {
        this.users = users;
      }),
      catchError(error => {
        console.error('Error fetching users:', error);
        throw error;
      })
    );
  }

  deleteUser(userId: number) {
    this.users = this.users.filter(user => user.id !== userId);
    }
}
