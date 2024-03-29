import { createSelector, createFeatureSelector } from '@ngrx/store';
import {UsersState} from "./users.reducer";


export const selectUsersState = createFeatureSelector<UsersState>('users');

export const selectUsers = createSelector(
  selectUsersState,
  state => state.users
);
