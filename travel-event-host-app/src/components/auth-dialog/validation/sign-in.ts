import { RuleValidator } from '@/lib/validators/rule-validator/rule-validator';
import { EmptyNullStringRule } from '@/lib/validators/rules/empty-null-string-rule';
import { ValidEmailRule } from '@/lib/validators/rules/valid-email-rule';

export const validateLogin = ({
  email,
  password,
}: {
  email: string;
  password: string;
}): Record<string, string[]> => {
  // Validate the fields before submitting
  const emailAddressValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('email'),
    new ValidEmailRule('email'),
  ]);

  const passwordValidator: RuleValidator = new RuleValidator([
    new EmptyNullStringRule('password1', 'Password field cannot be empty'),
  ]);

  return {
    ...emailAddressValidator.validate(email),
    ...passwordValidator.validate(password),
  };
};
