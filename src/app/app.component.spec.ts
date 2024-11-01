import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { BaseButtonComponent } from './components/base-button/base-button.component';
import { InputSearchComponent } from './product/components/input-search/input-search.component';
import { ListComponent } from './product/components/list/list.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AppComponent,
        RouterOutlet,
        HeaderComponent,
        BaseButtonComponent,
        InputSearchComponent,
        ListComponent
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the header component', () => {
    const headerElement = fixture.debugElement.query(By.directive(HeaderComponent));
    expect(headerElement).toBeTruthy();
  });

  it('should render the main element', () => {
    const mainElement = fixture.debugElement.query(By.css('main'));
    expect(mainElement).toBeTruthy();
  });

  it('should render the router outlet', () => {
    const outletElement = fixture.debugElement.query(By.directive(RouterOutlet));
    expect(outletElement).toBeTruthy();
  });

  it('should have the correct title', () => {
    expect(component.title).toBe('financial-products');
  });
});
