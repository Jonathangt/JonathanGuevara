import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BaseButtonComponent } from './base-button.component';
import { By } from '@angular/platform-browser';

describe('BaseButtonComponent', () => {
  let component: BaseButtonComponent;
  let fixture: ComponentFixture<BaseButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseButtonComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BaseButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the correct button text', () => {
    component.text = 'Click Me';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.custom-button'));
    expect(buttonElement.nativeElement.textContent.trim()).toBe('Click Me');
  });

  it('should apply the correct background color', () => {
    component.backgroundColor = 'red';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.custom-button'));
    expect(buttonElement.nativeElement.style.backgroundColor).toBe('red');
  });

  it('should apply the correct padding', () => {
    component.padding = '2rem';
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.custom-button'));
    expect(buttonElement.nativeElement.style.padding).toBe('2rem');
  });

  it('should be disabled when the disabled input is true', () => {
    component.disabled = true;
    fixture.detectChanges();
    const buttonElement = fixture.debugElement.query(By.css('.custom-button'));
    expect(buttonElement.nativeElement.disabled).toBe(true);
  });

  it('should emit action when the button is clicked', () => {
    const emitSpy = jest.spyOn(component.action, 'emit');
    const buttonElement = fixture.debugElement.query(By.css('.custom-button'));
    buttonElement.nativeElement.click();
    expect(emitSpy).toHaveBeenCalled();
  });
});
