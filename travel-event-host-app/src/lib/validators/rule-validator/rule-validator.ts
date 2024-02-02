import { BaseRule } from '../base-rule/base-rule';

/**
 * This loops through all the rules for a field and validates the value
 */
export class RuleValidator {
  private validationRules: BaseRule[] = [];
  constructor(rules: BaseRule[]) {
    this.validationRules = rules;
  }

  public validate(value: string | [string, string]): Record<string, string[]> {
    const errors: Record<string, string[]> = {};
    this.validationRules.forEach((rule) => {
      const error = rule.validate(value);
      if (error) {
        if (!errors[error.fieldName]) errors[error.fieldName] = [];
        errors[error.fieldName] = errors[error.fieldName].concat(error.errorMessage);
      }
    });
    return errors;
  }
}
