import {Injectable} from '@angular/core';
import {User} from "../models/user";

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  constructor() {
  }

  public setItem(value: User[]): void {
    localStorage.setItem('users', JSON.stringify(value))
  }

  public getItem(): User[] | null {
    const key = 'users'
    const usersJSON: string | null = localStorage.getItem(key);

    if (usersJSON === null) {
      return null
    }

    try {
      const users: User[] = JSON.parse(usersJSON);
      if (users.length === 0) {
        return null;
      }
      return users;
    } catch (error) {
      return null;
    }
  }
}
