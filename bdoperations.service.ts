import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';

import * as cordovaSQLiteDriver from 'localforage-cordovasqlitedriver';
import { Observable, catchError, throwError } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class BdoperationsService {
  getdepot(arg0: string) {
    throw new Error('Method not implemented.');
  }
  getoperations(arg0: string, etudiant: any) {
    throw new Error('Method not implemented.');
  }
  private newUrl = 'http://192.168.100.97:3000/transactions/newtrans';
  private routeurl = 'http://192.168.100.97:3000/transactions';

  constructor(private http: HttpClient) {}

  newtrans(Data: FormData): Observable<any> {
    const headers = new HttpHeaders()
    const options = { headers: headers }
    return this.http.post(this.newUrl, Data,options);

  }
  getListOftrans(page: number): Observable<any> {
    const url = `${this.routeurl}?page=${page}`;
    return this.http.get(url).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while fetching the list of songs.');
      })
    );
  }
  unetrans(id: number): Observable<any> {
    return this.http.get(this.routeurl + "/one/" + id)
  }
  updatetrans(id: any, updatedSongData: FormData): Observable<any> {
    const url = `${this.routeurl}/${id}`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.put(url, updatedSongData).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while updating the song.');
      })
    );
  }

  deletetrans(id: any): Observable<any> {
    const url = `${this.routeurl}/${id}`;
    return this.http.delete(url).pipe(
      catchError((error) => {
        console.error('Error:', error);
        return throwError('An error occurred while deleting the song.');
      })
    );
  }


  effectuerTransaction(transaction: any): Observable<any> {
    // Effectuez ici les opérations nécessaires pour sauvegarder la transaction dans la base de données
    // Vous pouvez utiliser this.http.post() pour envoyer la transaction au serveur

    // Exemple de code pour envoyer la transaction au serveur
    return this.http.post<any>('votre-url-api/transactions', transaction);
  }
}