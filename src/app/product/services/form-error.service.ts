import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

type ErrorType = 'required' | 'minlength' | 'maxlength' | 'idExists' | 'invalidReleaseDate' | 'invalidRevisionDate';

const ERROR_MESSAGES: { [key in ErrorType]: (fieldLabel: string, error?: any) => string } = {
  required: (fieldLabel: string) => `${fieldLabel} es requerido.`,
  minlength: (fieldLabel: string, error: any) => `${fieldLabel} debe tener al menos ${error.requiredLength} caracteres.`,
  maxlength: (fieldLabel: string, error: any) => `${fieldLabel} no puede tener más de ${error.requiredLength} caracteres.`,
  idExists: () => `El ID ya existe.`,
  invalidReleaseDate: () => `La Fecha de Liberación debe ser igual o mayor a la fecha actual.`,
  invalidRevisionDate: () => `La Fecha de Revisión debe ser exactamente un año posterior a la fecha de liberación.`
};

@Injectable({
  providedIn: 'root'
})

export class FormErrorService {
  constructor() {
  }

  getErrorMessage(form: FormGroup, field: string): string | null {
    const control = this.getControl(form, field);
    if (!control) return null;

    const errorType = this.getFirstErrorType(control) as ErrorType;
    if (!errorType) return null;

    const fieldLabel = this.getFieldLabel(field);
    return this.generateErrorMessage(errorType, fieldLabel, control.getError(errorType));
  }

  private getControl(form: FormGroup, field: string): AbstractControl | null {
    return form.get(field);
  }

  private getFirstErrorType(control: AbstractControl): string | null {
    const errors = control.errors;
    if (!errors) return null;

    return Object.keys(errors)[0];
  }

  private getFieldLabel(field: string): string {
    const fieldLabels: { [key: string]: string } = {
      id: 'ID',
      name: 'Nombre',
      description: 'Descripción',
      logo: 'Logo',
      date_release: 'Fecha de Liberación',
      date_revision: 'Fecha de Revisión'
    };

    return fieldLabels[field] || field;
  }

  private generateErrorMessage(errorType: ErrorType, fieldLabel: string, error: any): string | null {
    const errorMessageGenerator = ERROR_MESSAGES[errorType];
    return errorMessageGenerator ? errorMessageGenerator(fieldLabel, error) : null;
  }
}
