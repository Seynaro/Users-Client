import {createReducer, on} from '@ngrx/store';
import * as UserActions from './users.actions';
import {User} from "../models/user";

export const usersFeatureKey = 'users';

export interface UsersState {
  users: User[]
  status: boolean
  error: any
}

export const initialState: UsersState = {
  users: [],
  status: false,
  error: null
};

export const usersReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.loadUsersSuccess, (state, {users}) => ({
    ...state,
    users: users,
    loading: false,
  })),
  on(UserActions.loadUsersFail, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true,
  })),
  on(UserActions.deleteUserSuccess, (state, {deletedUser}) => ({
    ...state,
    users: state.users.filter(user => user.id !== deletedUser),
  })),
  on(UserActions.deleteUserFail, (state, {error}) => ({
    ...state,
    loading: false,
    error,
  })),
  on(UserActions.addUser, (state) => ({
    ...state,
  })),
  on(UserActions.addUserSuccess, (state, {newUser}) => ({
    ...state,
    users: [...state.users, newUser],
  })),
  on(UserActions.addUserFail, (state, {error}) => ({
    ...state,
    error: error,
  })),
  on(UserActions.editUser, (state) => ({
    ...state,
  })),
  on(UserActions.editUserSuccess, (state, {editedUser}) => ({
    ...state,
    users: state.users.map(user =>
      user.id == editedUser.id ? editedUser : user
    ),
  })),
  on(UserActions.editUserFail, (state, {error}) => ({
    ...state,
    error,
  })),
)
