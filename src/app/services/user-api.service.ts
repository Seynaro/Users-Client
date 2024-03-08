import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {User} from "../models/user";

@Injectable({
  providedIn: "root"
})

export class UserApiService {
  private readonly apiUrl = 'https://jsonplaceholder.typicode.com/users'

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl)
  }

  deleteUser(id: number) {
    return this.http.delete(this.apiUrl + `/${id}`)
  }

  addUser(user: User): Observable<{ id: number }> {
    return this.http.post<{ id: number }>(this.apiUrl, user)
  }

  editUser(user: Partial<User>) {
    return this.http.patch(this.apiUrl + `/${user.id}`, user)
  }


}
