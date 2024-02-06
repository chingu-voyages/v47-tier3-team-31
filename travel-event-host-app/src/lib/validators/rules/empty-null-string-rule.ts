import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

export class EmptyNullStringRule extends BaseRule {
  constructor(fieldName: string, validationMsg?: string) {
    super(`${validationMsg || 'The value entered cannot be empty.'}`, fieldName);
  }

  validate(value: string): ValidationError | undefined {
    if (value === undefined || value.trim() === '') {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
