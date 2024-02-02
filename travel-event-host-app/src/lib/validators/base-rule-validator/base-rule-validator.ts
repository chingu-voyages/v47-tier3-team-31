import { ValidationError } from '../validation-error/validation-error';

export abstract class BaseRuleValidator {
  protected fieldName: string;
  protected ruleName: string;
  constructor(ruleName: string, fieldName: string) {
    this.fieldName = fieldName;
    this.ruleName = ruleName;
  }

  abstract validate(values: string | [string, string]): ValidationError | undefined;
}
