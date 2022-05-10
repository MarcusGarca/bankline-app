import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class MovimentacaoService {
  constructor(private http: HttpClient) {}
  //método de consulta (GET) as movimentações via API
  list(): Observable<any> {
    return this.http.get(`${baseUrl}/movimentacoes`);
  }
  //método de consulta (GET) as movimentações por cliente via API
  findByIdConta(idConta: any): Observable<any> {
    return this.http.get(`${baseUrl}/movimentacoes/${idConta}`);
  }

  //método de inclusão (POST) de uma movimentação via API
  create(movimentacao: any): Observable<any> {
    return this.http.post(`${baseUrl}/movimentacoes`, movimentacao);
  }
}
