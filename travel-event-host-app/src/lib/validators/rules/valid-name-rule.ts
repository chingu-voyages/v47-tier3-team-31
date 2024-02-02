import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

// This should include diacritics, so that names like "José" are allowed.
export class ValidNameRule extends BaseRule {
  constructor(fieldName: string) {
    super('Field has invalid characters', fieldName);
  }

  validate(value: string): ValidationError | undefined {
    if (!value?.match(/[\p{Letter}\s]+/gu)) {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
