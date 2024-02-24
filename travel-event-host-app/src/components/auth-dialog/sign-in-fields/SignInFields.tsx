import { Box } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { ErrorComponent } from '../../ErrorComponent/ErrorComponent';
import {
  CustomTextField,
  FormFieldLabel,
  StyledFormFieldSection,
} from '../../custom-fields/CustomFields';

export const SignInFields = (
  handleInputChanged: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  errors: Record<string, string[]>,
  formValues: Record<string, string>,
) => {
  return (
    <Box className='loginFormFields'>
      <StyledFormFieldSection>
        <FormFieldLabel>E-mail</FormFieldLabel>
        <CustomTextField
          autoFocus
          required
          margin='dense'
          id='email'
          name='email'
          label='Email Address'
          type='email'
          fullWidth
          variant='outlined'
          autoComplete='email'
          InputLabelProps={{ shrink: false }}
          inputProps={{ maxLength: 30 }}
          onChange={handleInputChanged}
          value={formValues.email}
        />
        <ErrorComponent fieldName='email' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <FormFieldLabel>Your password</FormFieldLabel>
        <CustomTextField
          autoFocus
          required
          margin='dense'
          id='password1'
          name='password1'
          label='Enter a password'
          type='password'
          fullWidth
          variant='outlined'
          autoComplete='password1'
          InputLabelProps={{ shrink: false }}
          inputProps={{ maxLength: 30 }}
          onChange={handleInputChanged}
          value={formValues.password1}
        />
        <ErrorComponent fieldName='password1' errors={errors} />
      </StyledFormFieldSection>
    </Box>
  );
};
