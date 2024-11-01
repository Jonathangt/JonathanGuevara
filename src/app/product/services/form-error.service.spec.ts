import { FormErrorService } from './form-error.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

describe('FormErrorService', () => {
  let service: FormErrorService;
  let form: FormGroup;

  beforeEach(() => {
    service = new FormErrorService();
    const fb = new FormBuilder();

    form = fb.group({
      id: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      logo: ['', [Validators.required]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]]
    });
  });

  it('should return required error message for required field', () => {
    form.get('id')?.setValue('');
    const result = service.getErrorMessage(form, 'id');
    expect(result).toBe('ID es requerido.');
  });

  it('should return minlength error message', () => {
    form.get('id')?.setValue('12');
    const result = service.getErrorMessage(form, 'id');
    expect(result).toBe('ID debe tener al menos 3 caracteres.');
  });

  it('should return maxlength error message', () => {
    form.get('id')?.setValue('12345678901');
    const result = service.getErrorMessage(form, 'id');
    expect(result).toBe('ID no puede tener más de 10 caracteres.');
  });

  it('should return idExists error message', () => {
    form.get('id')?.setErrors({ idExists: true });
    const result = service.getErrorMessage(form, 'id');
    expect(result).toBe('El ID ya existe.');
  });

  it('should return invalidReleaseDate error message', () => {
    form.get('date_release')?.setErrors({ invalidReleaseDate: true });
    const result = service.getErrorMessage(form, 'date_release');
    expect(result).toBe('La Fecha de Liberación debe ser igual o mayor a la fecha actual.');
  });

  it('should return invalidRevisionDate error message', () => {
    form.get('date_revision')?.setErrors({ invalidRevisionDate: true });
    const result = service.getErrorMessage(form, 'date_revision');
    expect(result).toBe('La Fecha de Revisión debe ser exactamente un año posterior a la fecha de liberación.');
  });

  it('should return null if control is not found', () => {
    const result = service.getErrorMessage(form, 'unknownField');
    expect(result).toBeNull();
  });

  it('should return null if there are no errors', () => {
    form.get('id')?.setValue('validId');
    const result = service.getErrorMessage(form, 'id');
    expect(result).toBeNull();
  });
});
