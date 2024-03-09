import {Component, Inject} from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators} from "@angular/forms";
import {
  MAT_DIALOG_DATA,
  MatDialogActions, MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  } from "@angular/material/dialog";
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";

@Component({
  selector: 'app-create-edit-user',
  standalone: true,
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './create-edit-user.component.html',
  styleUrl: './create-edit-user.component.css'
})
export class CreateEditUserComponent {

  constructor(
    public dialogRef: MatDialogRef<CreateEditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {isEdit: boolean | undefined, dataUser:any},
  ) {}

  ngOnInit(): void {
    if(this.data.isEdit){
      this.pathValueForm();
    }
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  myForm = new FormGroup({
    id: new FormControl( new Date().getTime(), Validators.required),
    name: new FormControl( '' , Validators.required),
    username: new FormControl( '', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required, Validators.minLength(5)]),
  })

  pathValueForm(){
    this.myForm.patchValue(this.data.dataUser)
  }
}
