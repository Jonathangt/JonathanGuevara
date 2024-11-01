import { AbstractControl, ValidationErrors } from '@angular/forms';

export function releaseDateValidator(control: AbstractControl): ValidationErrors | null {
  const currentDate = new Date();
  const releaseDate = new Date(control.value);

  currentDate.setHours(0, 0, 0, 0);
  releaseDate.setHours(0, 0, 0, 0);

  return releaseDate.getTime() >= currentDate.getTime() ? null : { invalidReleaseDate: true };
}
