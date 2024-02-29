import { Routes } from '@angular/router';
import {UsersListComponent} from "./components/users-list/users-list.component";
import {UserCardComponent} from "./components/user-card/user-card.component";

export const appRoutes: Routes = [
  { path: 'users', component: UsersListComponent },
];
