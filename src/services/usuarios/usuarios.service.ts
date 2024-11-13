import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private apiUrl = 'https://localhost:7160/'
  private apiInserir = this.apiUrl + 'inserir';
  private apiEditar = this.apiUrl + 'editar';
  private apiGetUserById = this.apiUrl + 'getusuariobyid';

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  GetUsuarioById(id:any): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiGetUserById}/${id}`);
  }

  addUsuario(data: any): Observable<any> {
    return this.http.post<any>(this.apiInserir, data);
  }

  editUsuario(data: any): Observable<any> {
    console.log('entrou editUsuario');
    console.log(data);
    return this.http.put<any>(this.apiEditar, data);
  }
}

