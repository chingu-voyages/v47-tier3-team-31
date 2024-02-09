import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

export class MatchingPasswordsRule extends BaseRule {
  constructor(fieldName: string) {
    super('The password values must match.', fieldName);
  }

  validate(values: [string, string]): ValidationError | undefined {
    if (values[0] !== values[1]) {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
