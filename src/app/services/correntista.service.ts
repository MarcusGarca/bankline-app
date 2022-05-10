import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const baseUrl = 'http://localhost:8080';

@Injectable({
  providedIn: 'root',
})
export class CorrentistaService {
  constructor(private http: HttpClient) {}
  //método de consulta ao correntista (GET) via API
  list(): Observable<any> {
    return this.http.get(`${baseUrl}/correntistas`);
  }
  //método de inclusão (POST) de um correntista via API
  create(correntista: any): Observable<any> {
    return this.http.post(`${baseUrl}/correntistas`, correntista);
  }
}
