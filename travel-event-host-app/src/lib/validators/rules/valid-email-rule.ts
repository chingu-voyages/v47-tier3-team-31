import { BaseRule } from '../base-rule/base-rule';
import { ValidationError } from '../validation-error/validation-error';

export class ValidEmailRule extends BaseRule {
  constructor(fieldName: string) {
    super('Enter a valid e-mail address', fieldName);
  }

  validate(value: string): ValidationError | undefined {
    if (
      !value?.match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      )
    ) {
      return {
        fieldName: this.fieldName,
        errorMessage: this.ruleName,
      };
    }
  }
}
