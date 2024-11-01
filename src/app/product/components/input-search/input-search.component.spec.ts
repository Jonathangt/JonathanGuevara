import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { InputSearchComponent } from './input-search.component';
import { ProductService } from '../../services/product.service';
import { ProductStore } from '../../store/product.store';

describe('InputSearchComponent', () => {
  let component: InputSearchComponent;
  let fixture: ComponentFixture<InputSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSearchComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        ProductService,
        ProductStore
      ]
    })
      .compileComponents();

    fixture = TestBed.createComponent(InputSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
