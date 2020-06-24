import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class DataService {

  dataUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) { }

  getData() {
    return this.http.get(this.dataUrl);
  }

  deleteItem(id: number) {
    return this.http.delete(`${this.dataUrl}/${id}`)
  }

  getItem(id) {
    return this.http.get(`${this.dataUrl}/${id}`);
  }

  updateItem(newItem, id){
    return this.http.put(`${this.dataUrl}/${id}`,newItem, httpOptions);
  }

  addItem(newItem) {
    return this.http.post(this.dataUrl, newItem, httpOptions);
  }

}
