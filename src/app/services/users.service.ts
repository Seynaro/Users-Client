import {inject, Injectable} from '@angular/core';
import {User} from "../models/user";
import {LocalStorageService} from "./localstorage.service";
import {BehaviorSubject, map, shareReplay, switchMap, tap} from "rxjs";
import {UsersApiService} from "./users-api.service";

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private userApi = inject(UsersApiService);
  private lsService =inject(LocalStorageService);

  private readonly usersSubject$ = new BehaviorSubject<User[]>([]);
  public readonly users$ = this.usersSubject$.asObservable();

  local(data: User[]): void{
    this.usersSubject$.next(data)
  }

  loadUserss(): void{
    this.userApi.getUsers().pipe(
      tap((data:User[]) => this.usersSubject$.next(data)),
      switchMap( () => this.usersSubject$),
      map(() => this.lsService.setItem(this.usersSubject$.value)),
      shareReplay(1),
    ).subscribe()
  }

  deleteUser(id?:number): void{
    const upDataUsers = this.usersSubject$.value.filter(
      (user: User) => user.id !== id);
    this.usersSubject$.next(upDataUsers);
    this.lsService.setItem(this.usersSubject$.value);
  }

  addUser(data: User):void{
    this.usersSubject$.next(
      [...this.usersSubject$.value, data],
    )
    this.lsService.setItem(this.usersSubject$.value);
  }

  saveEditDataUser(edituser: User):void{
    this.usersSubject$.next(
      this.usersSubject$.value.map(
        user => user.id === edituser.id ? edituser : user,
      ),
    )
    this.lsService.setItem(this.usersSubject$.value);
  }
}
