import { releaseDateValidator } from './release-date.validator';
import { FormControl } from '@angular/forms';

describe('releaseDateValidator', () => {
  it('should return null if release date is today', () => {
    const today = new Date().toISOString();
    const control = new FormControl(today);
    const result = releaseDateValidator(control);
    expect(result).toBeNull();
  });

  it('should return null if release date is in the future', () => {
    const futureDate = new Date(Date.now() + 86400000).toISOString();
    const control = new FormControl(futureDate);
    const result = releaseDateValidator(control);
    expect(result).toBeNull();
  });

  it('should return an error if release date is in the past', () => {
    const pastDate = new Date(Date.now() - 86400000).toISOString();
    const control = new FormControl(pastDate);
    const result = releaseDateValidator(control);
    expect(result).toEqual({ invalidReleaseDate: true });
  });

  it('should return an error if no value is provided', () => {
    const control = new FormControl(null);
    const result = releaseDateValidator(control);
    expect(result).toEqual({ invalidReleaseDate: true });
  });
});
