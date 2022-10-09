import { Observable, Subject } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Item } from '../models/item.model';

@Injectable({
  providedIn: 'root',
})
export class ItemsService {
  private url = 'http://localhost:5000';
  private subject = new Subject<Item>();

  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getItems(): Observable<Item[]> {
    const url = `${this.url}/items`;
    return this.http.get<Item[]>(url, this.httpOptions);
  }

  getItem(id: string): Observable<Item> {
    const url = `${this.url}/items/${id}`;
    return this.http.get<Item>(url, this.httpOptions);
  }

  updateItem(id: string, data: Item): Observable<Item> {
    const url = `${this.url}/items/${id}`;
    return this.http.put<Item>(url, data, this.httpOptions);
  }

  deleteItem(id: string): Observable<Item> {
    const url = `${this.url}/items/${id}`;
    return this.http.delete<any>(url, this.httpOptions);
  }

  postItem(data: Omit<Item, 'id'>): Observable<Item> {
    const url = `${this.url}/items`;
    return this.http.post<Item>(url, data, this.httpOptions);
  }

  addItemToCatalog(item: Item): void {
    this.subject.next(item);
  }

  onAddItemToCatalog(): Observable<Item> {
    return this.subject.asObservable();
  }
}
