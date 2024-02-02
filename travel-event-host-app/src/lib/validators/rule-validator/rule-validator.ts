import { BaseRuleValidator } from '../base-rule-validator/base-rule-validator';

export class RuleValidator {
  private validationRules: BaseRuleValidator[] = [];
  constructor(rules: BaseRuleValidator[]) {
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
