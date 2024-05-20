import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BooksInventoryComponent } from './books-inventory.component';

describe('BooksInventoryComponent', () => {
  let component: BooksInventoryComponent;
  let fixture: ComponentFixture<BooksInventoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BooksInventoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BooksInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
