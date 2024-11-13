import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BuscarCEPService {

  private url = 'https://viacep.com.br/ws';

  constructor(private http: HttpClient) {}

  BuscarCep(cep: string): Observable<any> {
    // Remove caracteres não numéricos
    const cepFormatado = cep.replace("-", "");

    // Verifica se o CEP tem o comprimento correto
    if (cepFormatado.length !== 8) {
      throw new Error("CEP inválido. Certifique-se de que está digitando 8 dígitos.");
    }

    return this.http.get<any>(`${this.url}/${cepFormatado}/json/`);
  }
}
