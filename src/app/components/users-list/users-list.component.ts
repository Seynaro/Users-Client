import {Component, inject, OnInit} from '@angular/core';
import {User} from "../../models/user";
import {UserCardComponent} from "../user-card/user-card.component";
import {UsersService} from "../../services/users.service";
import {AsyncPipe, NgForOf} from "@angular/common";
import {MatButtonModule} from '@angular/material/button';
import {MatDialog} from "@angular/material/dialog";
import {LocalStorageService} from "../../services/localstorage.service";
import {map, take} from "rxjs";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";

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
export class UsersListComponent {
  constructor(public dialog: MatDialog){
    this.setLocal();
  }
  public usersService: UsersService = inject(UsersService);
  public localService: LocalStorageService = inject(LocalStorageService);

  deleteUser(id:number): void{
    this.usersService.deleteUser(id);
  }

  openDialog():void{
    const dialogRef = this.dialog.open(CreateEditUserComponent, {data:{}});
    dialogRef.afterClosed().pipe(
      map((myForm: User) => {
        if(myForm != undefined){
          this.usersService.addUser(myForm)
          console.log(myForm)
        }
      }),
      take(1)
    ).subscribe()
  }

  setLocal(): void{
    const data: User[] | null = this.localService.getItem();
    if(data === null){
      this.usersService.loadUserss();
    } else {
      this.usersService.local(data);
    }
  }
}
