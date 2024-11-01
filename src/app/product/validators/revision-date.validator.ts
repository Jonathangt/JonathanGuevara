import { AbstractControl, ValidationErrors } from '@angular/forms';

export function revisionDateValidator(group: AbstractControl): ValidationErrors | null {
  const releaseDateValue = group.get('dateRelease')?.value;
  const revisionDateValue = group.get('dateRevision')?.value;

  if (!releaseDateValue || !revisionDateValue) return null;

  const releaseDate = new Date(releaseDateValue);
  const revisionDate = new Date(revisionDateValue);

  if (isNaN(releaseDate.getTime()) || isNaN(revisionDate.getTime())) return null;

  const oneYearAfterRelease = new Date(releaseDate);
  oneYearAfterRelease.setFullYear(releaseDate.getFullYear() + 1);
  return revisionDate.getTime() === oneYearAfterRelease.getTime() ? null : { invalidRevisionDate: true };
}
