import {Component, EventEmitter, Input, Output} from '@angular/core';
import {User} from "../../models/user";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {map, takeUntil} from "rxjs";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatCardModule} from "@angular/material/card";

@Component({
  selector: 'app-user-card',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './user-card.component.html',
  styleUrl: './user-card.component.css'
})
export class UserCardComponent {
  constructor(
    public dialod: MatDialog,
  ){}

  @Input() user?: User;
  @Output() id = new EventEmitter<number>();

  getIdCardDel(id:number | undefined): void{
    this.id.emit(id);
  }

  public isEdit: boolean = true;
  openDialog(id:number | undefined): void{
    const dialogEdit = this.dialod.open(CreateEditUserComponent, {data: {isEdit: this.isEdit, dataUser: this.user}});
    dialogEdit.afterClosed().pipe(
      map((edit: User) => {
        if(edit != undefined){
          //this.userService.saveEditDataUser(edit);
        }
        takeUntil(dialogEdit.afterClosed())
      }),
    ).subscribe();
  }
}
