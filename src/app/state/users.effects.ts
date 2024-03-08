import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';
import * as UserActions from "./users.actions";
import {catchError, map, of, switchMap, tap} from "rxjs";
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
      switchMap(() => {
        const savedUsers = localStorage.getItem('users');
        if (!savedUsers || JSON.parse(savedUsers).length === 0) {
          return this.userApi.getUsers().pipe(
            tap(userList => localStorage.setItem('users', JSON.stringify(userList))),
            map(userList => UserActions.loadUsersSuccess({users: userList})),
          );
        } else {
          return of(UserActions.loadUsersSuccess({users: JSON.parse(savedUsers)}));
        }
      })
    ));

  delete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      switchMap(({deletedUser}) =>
        of(this.userApi.deleteUser(deletedUser)).pipe(
          map(() => UserActions.deleteUserSuccess({deletedUser})))
      )))

  addUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.addUser),
      switchMap(({newUser}) =>
        of(this.userApi.addUser(newUser)).pipe(
          map(() => UserActions.addUserSuccess({newUser}))))
    ))

  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(editUser),
      switchMap(({ editedUser }) =>
        this.userApi.editUser(editedUser).pipe(
          map(() => UserActions.editUserSuccess({ editedUser })),
          catchError(error => {
            console.error('Error editing user:', error);
            // Возвращаем пустой Observable, чтобы эффект не завершился ошибкой
            return of();
          })
        )
      )
    )
  )
}
