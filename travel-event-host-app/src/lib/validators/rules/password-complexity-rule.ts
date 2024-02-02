import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

export class PasswordComplexityRule extends BaseRule {
  constructor(fieldName: string) {
    super(
      'Password should be at least 8 characters and contain at least one number, one uppercase letter, one lowercase letter and a special character.',
      fieldName,
    );
  }

  validate(value: string): ValidationError | undefined {
    const passwordRegex = /((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%]).{8,30})/;
    if (!passwordRegex.test(value)) {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
