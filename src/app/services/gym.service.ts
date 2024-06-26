import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';


@Injectable({
    providedIn: 'root'
})
export class GymService {

    private baseUrl = 'http://localhost:3000/enquiry'

    constructor(private http: HttpClient) { }


    postRegistration(registerObj: User) {
        return this.http.post<User[]>(`${this.baseUrl}`, registerObj)
    }
    getRegistredUser() {
        return this.http.get<User>(`${this.baseUrl}`)
    }
    updateRegisterUser(registerObj: User, id: number) {
        return this.http.put<User>(`${this.baseUrl}/${id}`, registerObj)
    }
    deleteRegisteredUser(id: number) {
        return this.http.delete<User>(`${this.baseUrl}/${id}`)
    }
    getRegisteredUserId(id: number) {
        return this.http.get<User>(`${this.baseUrl}/${id}`)
    }



}




