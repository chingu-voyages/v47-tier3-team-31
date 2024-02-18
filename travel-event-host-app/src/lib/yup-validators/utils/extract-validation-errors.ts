/**
 * Takes Yup errors and returns a record of validation errors (fieldName: string[]).
 * @param errors Yup errors validation data
 * @returns
 */
export function extractValidationErrors(errors: any): Record<string, string[]> {
  const validationErrors: Record<string, string[]> = {};
  for (const error of errors.inner) {
    if (error.path in validationErrors) {
      validationErrors[error.path].push(error.message);
    } else {
      validationErrors[error.path] = [error.message];
    }
  }
  return validationErrors;
}
