import { ValidationError } from '../validation-error/validation-error';

/**
 * template for creating different validation rules
 */
export abstract class BaseRule {
  protected fieldName: string;
  protected ruleName: string;
  constructor(ruleName: string, fieldName: string) {
    this.fieldName = fieldName;
    this.ruleName = ruleName;
  }

  abstract validate(values: string | [string, string]): ValidationError | undefined;
}
