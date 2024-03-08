import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserCardComponent} from "../user-card/user-card.component";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {map, take} from "rxjs";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {Store} from "@ngrx/store";
import {addUser, deleteUser, loadUsers} from "../../state/users.actions";
import {selectUsers} from "../../state/users.selectors";

@Component({
  selector: 'app-users-list',
  standalone: true,
  imports: [
    UserCardComponent,
    AsyncPipe,
    NgForOf,
    MatButtonModule,
  ],
  templateUrl: './users-list.component.html',
  styleUrl: './users-list.component.css'
})
export class UsersListComponent implements OnInit{
  constructor(public dialog: MatDialog,
  ){
  }

  private store = inject(Store)
  readonly users$= this.store.select(selectUsers)

  deleteUser(deletedUser: number): void{
    this.store.dispatch(deleteUser({deletedUser}))
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateEditUserComponent, { data: {} });
    dialogRef.afterClosed().subscribe((newUser: User) => {
      if (newUser) {
        this.store.dispatch(addUser({ newUser }));
      }
    });
  }

  ngOnInit(): void {
    this.store.dispatch(loadUsers())
  }
}
