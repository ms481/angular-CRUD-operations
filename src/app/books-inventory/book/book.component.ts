import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReferenceDataService } from 'src/app/service/reference-data.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BooksService } from 'src/app/service/books.service';
import { Book } from 'src/app/model/book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css'],
})
export class BookComponent implements OnInit {
  bookId: string | null = this.data;
  book!: Book;

  booksForm: FormGroup = this.fb.group({
    title: ['', Validators.required],
    author: ['', Validators.required],
    category: ['', Validators.required],
    language: ['', Validators.required],
    quantity: [0, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private _refDataService: ReferenceDataService,
    private bookService: BooksService,
    public dialogRef: MatDialogRef<BookComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {}
  ngOnInit(): void {
    if (this.bookId) {
      this.getBook(this.bookId);
    }
  }

  get refDataService() {
    return this._refDataService;
  }

  initializeBookObject(): Book {
    const book: Book = {
      id: this.bookId ?? '',
      title: this.booksForm.get('title')?.value,
      author: this.booksForm.get('author')?.value,
      category: this.booksForm.get('category')?.value,
      language: this.booksForm.get('language')?.value,
      quantity: this.booksForm.get('quantity')?.value,
    };

    return book;
  }

  setValuesInForm(data: Book) {
    if (this.bookId != null) {
      this.booksForm.patchValue({
        title: data.title,
        author: data.author,
        category: data.category,
        language: data.language,
        quantity: data.quantity,
      });
    }
  }

  getBook(id: string) {
    this.bookService.getBookById(id).subscribe((res) => {
      this.book = res;
      this.setValuesInForm(this.book);
    });
  }

  addBook() {
    const book = this.initializeBookObject();

    this.bookService.addBook(book).subscribe({
      next: (data) => {
        this.closeDialog();
      },
    });
  }

  updateBook() {
    const book = this.initializeBookObject();

    if (this.bookId) {
      this.bookService.updateBook(book).subscribe({
        next: (data) => {
          this.closeDialog();
        },
      });
    }
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isRequiredError(controlName: string): boolean {
    return (
      this.booksForm.get(controlName)?.errors?.['required'] &&
      (this.booksForm.get(controlName)?.dirty || this.booksForm.get(controlName)?.touched)
    );
  }
}
