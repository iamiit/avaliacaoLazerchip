import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  postUsers(data : any){
    return this.http.post<any>("https://api-laser-teste.herokuapp.com/alunos/",data)
  }
  getUsers(){
    return this.http.get<any>("https://api-laser-teste.herokuapp.com/alunos/");
  }
  putProduct(data: any, id: number){
    return this.http.put<any>("https://api-laser-teste.herokuapp.com/alunos/"+id ,data)
  }
  deleteProduct(id: number){
    return this.http.delete<any>("https://api-laser-teste.herokuapp.com/alunos/"+id)
  }
}
