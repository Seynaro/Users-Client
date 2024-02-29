import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../models/user";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private http: HttpClient = inject(HttpClient);
  private apiUrl:string = 'https://jsonplaceholder.typicode.com/users';

  getUsers(): Observable<User[]>{
    return this.http.get<User[]>(this.apiUrl);
  }
}
