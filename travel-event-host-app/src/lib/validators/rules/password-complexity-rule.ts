import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

export class PasswordComplexityRule extends BaseRule {
  constructor(fieldName: string) {
    super('Password should be at least 8 characters.', fieldName);
  }

  validate(value: string): ValidationError | undefined {
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,30})/;
    if (value[0] === undefined || value[0].trim().length < 8) {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
