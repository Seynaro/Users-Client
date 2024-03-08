import {createAction, props} from "@ngrx/store";
import {User} from "../models/user";

export const loadUsers = createAction('Load Users')
export const loadUsersSuccess = createAction('Load Users Success',
  props<{users: User[]}>())
export const loadUsersFail = createAction('Load Users Fail',
  props<{error: Error}>())

export const deleteUser = createAction('Delete Users',
  props<{deletedUser: number}>())
export const deleteUserSuccess = createAction('Delete Users Success',
  props<{deletedUser: number}>())
export const deleteUserFail = createAction('Delete Users Fail',
  props<{error: Error}>())

export const addUser = createAction('Add Users',
  props<{newUser: User}>())
export const addUserSuccess = createAction('Add Users Success',
  props<{newUser: User}>())
export const addUserFail = createAction('Add Users Fail',
  props<{error: Error}>())

export const editUser = createAction('Edit Users',
  props<{editedUser: User}>())
export const editUserSuccess = createAction('Edit Users Success',
  props<{editedUser: User}>())
export const editUserFail = createAction('Edit Users Fail',
  props<{error: Error}>())
