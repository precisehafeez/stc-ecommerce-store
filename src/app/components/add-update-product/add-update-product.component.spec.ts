import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddUpdateProductComponent } from './add-update-product.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from "@angular/router/testing";
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AddUpdateProductComponent', () => {
  let component: AddUpdateProductComponent;
  let fixture: ComponentFixture<AddUpdateProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddUpdateProductComponent],
      imports: [HttpClientTestingModule,MatSnackBarModule,MatFormFieldModule,MatPaginatorModule,RouterTestingModule,MatInputModule,MatSelectModule,BrowserAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA]
    });
    fixture = TestBed.createComponent(AddUpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
