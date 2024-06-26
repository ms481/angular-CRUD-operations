import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Book } from '../model/book';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  url = 'http://localhost:3000';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getAllBooks(): Observable<Book[]> {
    return this.http
      .get<Book[]>(`${this.url}/books`)
      .pipe(catchError(this.handleError<Book[]>('getAllBooks', [])));
  }

  getBookById(id: string): Observable<Book> {
    return this.http
      .get<Book>(`${this.url}/books/${id}`)
      .pipe(catchError(this.handleError<Book>(`getBookById id=${id}`)));
  }

  updateBook(book: Book): Observable<any> {
    return this.http
      .put(`${this.url}/books/${book.id}`, book, this.httpOptions)
      .pipe(catchError(this.handleError<any>(`updateBook`)));
  }

  addBook(book: Book): Observable<Book> {
    return this.http
      .post<Book>(`${this.url}/books`, book, this.httpOptions)
      .pipe(catchError(this.handleError<Book>(`addBook`)));
  }

  deleteBook(id: string): Observable<Book> {
    return this.http
      .delete<Book>(`${this.url}/books/${id}`, this.httpOptions)
      .pipe(catchError(this.handleError<Book>(`deleteBook`)));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`);

      return of(result as T);
    };
  }
}
