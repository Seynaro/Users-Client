import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as UserActions from "./users.actions";
import {map, of, switchMap} from "rxjs";
import {UserApiService} from "../services/user-api.service";
import {editUser} from "./users.actions";

@Injectable()
export class UserEffects {
  constructor(
    private actions$: Actions,
    private userApi: UserApiService) {
  }

  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      switchMap(() =>
        this.userApi.getUsers().pipe(
          map(userList => UserActions.loadUsersSuccess({users: userList})
          )))))

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({deletedUser}) =>
        of(this.userApi.deleteUser(deletedUser)).pipe(
          map(() => UserActions.deleteUserSuccess({deletedUser})
          )))))

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({newUser}) =>
        of(this.userApi.addUser(newUser)).pipe(
          map(() => UserActions.addUserSuccess({newUser})
          )))))

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      switchMap(({editedUser}) =>
        of(this.userApi.editUser(editedUser)).pipe(
          map(() => UserActions.editUserSuccess({editedUser})
          )))))
}
