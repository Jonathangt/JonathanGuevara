import { revisionDateValidator } from './revision-date.validator';
import { FormControl, FormGroup } from '@angular/forms';

describe('revisionDateValidator', () => {
  it('should return null if revision date is exactly one year after release date', () => {
    const group = new FormGroup({
      dateRelease: new FormControl(new Date('2022-01-01').toISOString()),
      dateRevision: new FormControl(new Date('2023-01-01').toISOString())
    });

    const result = revisionDateValidator(group);
    expect(result).toBeNull();
  });

  it('should return an error if revision date is not one year after release date', () => {
    const group = new FormGroup({
      dateRelease: new FormControl(new Date('2022-01-01').toISOString()),
      dateRevision: new FormControl(new Date('2022-12-31').toISOString())
    });

    const result = revisionDateValidator(group);
    expect(result).toEqual({ invalidRevisionDate: true });
  });

  it('should return null if release date is invalid', () => {
    const group = new FormGroup({
      dateRelease: new FormControl('invalid date'),
      dateRevision: new FormControl(new Date('2023-01-01').toISOString())
    });

    const result = revisionDateValidator(group);
    expect(result).toBeNull();
  });

  it('should return null if revision date is invalid', () => {
    const group = new FormGroup({
      dateRelease: new FormControl(new Date('2022-01-01').toISOString()),
      dateRevision: new FormControl('invalid date')
    });

    const result = revisionDateValidator(group);
    expect(result).toBeNull();
  });

  it('should return null if both dates are not provided', () => {
    const group = new FormGroup({
      dateRelease: new FormControl(null),
      dateRevision: new FormControl(null)
    });

    const result = revisionDateValidator(group);
    expect(result).toBeNull();
  });
});
