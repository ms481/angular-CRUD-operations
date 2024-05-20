import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Book } from 'src/app/model/book';
import { BooksService } from 'src/app/service/books.service';
import { BookComponent } from '../book/book.component';
import { ReferenceDataService } from 'src/app/service/reference-data.service';
import { ReferenceDataPipe } from 'src/app/pipes/reference-data.pipe';

@Component({
  selector: 'app-books-inventory',
  templateUrl: './books-inventory.component.html',
  styleUrls: ['./books-inventory.component.css'],
})
export class BooksInventoryComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  displayedColumns: string[] = [
    'id',
    'title',
    'author',
    'category',
    'language',
    'quantity',
    'action',
  ];
  searchCondition: any = {};

  dataSource: MatTableDataSource<Book> = new MatTableDataSource();

  totalRows = 0;
  pageSize = 10;
  currentPage = 0;
  pageSizeOptions: number[] = [10, 25, 50, 100];

  constructor(
    private booksService: BooksService,
    public dialog: MatDialog,
    private _refDataService: ReferenceDataService,
    private refDataPipe: ReferenceDataPipe
  ) {}

  ngOnInit(): void {
    this.getAllBooks();

    // the value of the filter:any param is what is passed to dataSource.filter in applyFilter()
    this.dataSource.filterPredicate = (book: Book, filter: any) => this.customFilter(book, filter);
  }

  get refDataService() {
    return this._refDataService;
  }

  openDialog(id: string | null) {
    this.dialog
      .open(BookComponent, {
        data: id,
      })
      .afterClosed()
      .subscribe(() => {
        this.getAllBooks();
      });
  }

  getAllBooks() {
    this.booksService.getAllBooks().subscribe((res) => {
      this.dataSource.data = res;
      this.dataSource.paginator = this.paginator;
    });
  }

  addBook() {
    this.openDialog(null);
  }

  editBook(id: string) {
    this.openDialog(id);
  }

  deleteBook(id: string) {
    this.booksService.deleteBook(id).subscribe(() => {
      this.getAllBooks();
    });
  }

  clearFilters() {
    this.searchCondition = {};
    this.applyFilter();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
  }

  applyFilter() {
    this.dataSource.filter = this.searchCondition;
  }

  customFilter(book: Book, filter: any): boolean {
    let textSearch = true;
    let dropDownSearch = true;

    const keys = Object.keys(book);
    const values = Object.values(book);
    const valuesAsString = values.map(String);

    let dropDownFilter: string;
    if (filter['category'] != undefined) {
      dropDownFilter = filter['category'];

      dropDownSearch = valuesAsString.some((item) => {
        return item.toLowerCase().indexOf(dropDownFilter) != -1;
      });
    }

    if (filter.textSearch !== undefined) {
      for (let key of keys) {
        let value = book[key as keyof Book]?.toString()!;
        let valueTransformed = '';

        if (key === 'category' || key === 'language') {
          this.refDataPipe.transform(value, key)?.subscribe((res) => {
            valueTransformed = res[0]?.toLowerCase();
          });
        }

        textSearch =
          value?.toLowerCase().indexOf(filter.textSearch.toLowerCase()) != -1 ||
          valueTransformed?.indexOf(filter.textSearch.toLowerCase()) != -1;

        // If search result is false, the book object will be removed from the table
        // if there is a match textSearch is true
        if (textSearch === true) break;
      }
    }

    return textSearch && dropDownSearch;
  }
}
