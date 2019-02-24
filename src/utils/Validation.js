import { Validation } from 'property-validation';

class MyValidation extends Validation {
  validPassword(field, message) {
    return this.validation(field, message || 'invalid password', value => value.length >= 8);
  }
}

export default MyValidation;
