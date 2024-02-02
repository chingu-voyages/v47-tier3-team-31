import { BaseRuleValidator } from '../base-rule-validator/base-rule-validator';
import { ValidationError } from '../validation-error/validation-error';

export class EmptyNullStringRule extends BaseRuleValidator {
  constructor(fieldName: string, validationMsg?: string) {
    super(`${validationMsg || 'The value entered cannot be empty.'}`, fieldName);
  }

  validate(value: string): ValidationError | undefined {
    if (value === '' || value === null || value === undefined) {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
