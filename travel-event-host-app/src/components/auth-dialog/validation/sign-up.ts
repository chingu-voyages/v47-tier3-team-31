import { RuleValidator } from '@/lib/validators/rule-validator/rule-validator';
import { EmptyNullStringRule } from '@/lib/validators/rules/empty-null-string-rule';
import { MatchingPasswordsRule } from '@/lib/validators/rules/matching-passwords-rule';
import { PasswordComplexityRule } from '@/lib/validators/rules/password-complexity-rule';
import { ValidEmailRule } from '@/lib/validators/rules/valid-email-rule';
import { ValidNameRule } from '@/lib/validators/rules/valid-name-rule';

interface SignUpFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password1: string;
  password2: string;
}

export function validateSignUp({
  email,
  firstName,
  lastName,
  password1,
  password2,
}: SignUpFormValues): Record<string, string[]> {
  const emailAddressValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('email'),
    new ValidEmailRule('email'),
  ]);

  const firstNameValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('firstName'),
    new ValidNameRule('firstName'),
  ]);
  const lastNameValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('lastName'),
    new ValidNameRule('lastName'),
  ]);
  const firstPasswordValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('password1', 'Password field cannot be empty'),
    new PasswordComplexityRule('password1'),
  ]);

  const secondPasswordValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('password2', 'Password field cannot be empty'),
    new PasswordComplexityRule('password2'),
  ]);

  const matchingPasswordsValidator: RuleValidator = new RuleValidator([
    new MatchingPasswordsRule(['password1', 'password2']),
  ]);

  return {
    ...emailAddressValidator.validate(email),
    ...firstNameValidator.validate(firstName),
    ...lastNameValidator.validate(lastName),
    ...firstPasswordValidator.validate(password1),
    ...secondPasswordValidator.validate(password2),
    ...matchingPasswordsValidator.validate([password1, password2]),
  };
}
