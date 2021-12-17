import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {
  private url = environment.BACKEND_URL;
  private api = { images: `${this.url}/images` };
  constructor( private http: HttpClient) { }

  getAll(): Observable<any[]> {
    return this.http.get<any[]>(this.api.images);
  }

  create(imageData: any): Observable<void> {
    return this.http.post<void>(this.api.images, imageData);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api.images}/${id}`);
  }
}
