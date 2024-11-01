import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './components/header/header.component';
import { BaseButtonComponent } from '../components/base-button/base-button.component';
import { InputSearchComponent } from '../product/components/input-search/input-search.component';
import { ListComponent } from '../product/components/list/list.component';
import { By } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LayoutComponent,
        HeaderComponent,
        BaseButtonComponent,
        InputSearchComponent,
        ListComponent
      ],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  describe('Component Creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should render main container with correct class', () => {
      const mainElement = fixture.debugElement.query(By.css('.main-margin-page'));
      expect(mainElement).toBeTruthy();
    });
  });

});
