import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display "BANCO" title', () => {
    const titleElement = fixture.debugElement.query(By.css('.title-page'));
    expect(titleElement).toBeTruthy();
    expect(titleElement.nativeElement.textContent.trim()).toBe('BANCO');
  });

  it('should have correct header structure', () => {
    const headerContainer = fixture.debugElement.query(By.css('.header-container'));
    const iconContainer = fixture.debugElement.query(By.css('.icon-container'));
    const iconFront = fixture.debugElement.query(By.css('.icon-front'));
    const iconCircle = fixture.debugElement.query(By.css('.icon-circle'));

    expect(headerContainer).toBeTruthy();
    expect(iconContainer).toBeTruthy();
    expect(iconFront).toBeTruthy();
    expect(iconCircle).toBeTruthy();
  });

  it('should render header with correct structure', () => {
    const compiled = fixture.nativeElement;

    expect(compiled.querySelector('header.header-container')).toBeTruthy();
    expect(compiled.querySelector('.header-container .icon-container')).toBeTruthy();
    expect(compiled.querySelector('.icon-container .icon-front')).toBeTruthy();
    expect(compiled.querySelector('.icon-front .icon-circle')).toBeTruthy();
    expect(compiled.querySelector('.header-container .title-page')).toBeTruthy();
  });
});
