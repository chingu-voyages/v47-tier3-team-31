import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

export class MatchingPasswordsRule extends BaseRule {
  private fieldNames: [string, string];
  constructor(fieldNames: [string, string]) {
    super('The password values must match.', fieldNames.toString());
    this.fieldNames = fieldNames;
  }

  validate(values: [string, string]): ValidationError | undefined {
    console.log(values);
    if (values[0] !== values[1]) {
      return {
        fieldName: this.fieldNames[0],
        errorMessage: this.ruleName,
      };
    }
  }
}
