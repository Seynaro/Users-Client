import {Component, EventEmitter, inject, Input, Output} from '@angular/core';
import {User} from "../../models/user";
import {MatButtonModule} from "@angular/material/button";
import {MatDialog} from "@angular/material/dialog";
import {map, takeUntil} from "rxjs";
import {CreateEditUserComponent} from "../create-edit-user/create-edit-user.component";
import {MatCardModule} from "@angular/material/card";
import {Store} from "@ngrx/store";
import {editUser} from "../../state/users.actions";

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

  private store = inject(Store)
  @Input() user?: User;
  @Output() id = new EventEmitter<number>();

  getIdCardDel(id:number | undefined): void{
    this.id.emit(id);
  }

  public isEdit: boolean = true;
  openDialog(): void{
    const dialogEdit = this.dialod.open(CreateEditUserComponent, {data: {isEdit: this.isEdit, dataUser: this.user}});
    dialogEdit.afterClosed().pipe(
      map((editedUser: User) => {
        if(editedUser != undefined){
          this.store.dispatch(editUser({editedUser}))
        }
        takeUntil(dialogEdit.afterClosed())
      }),
    ).subscribe();
  }
}
