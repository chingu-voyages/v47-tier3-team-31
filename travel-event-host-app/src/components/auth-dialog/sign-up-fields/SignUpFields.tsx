import { AddressAutocomplete } from '@/components/address-autocomplete/AddressAutocomplete';
import { Box } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { ErrorComponent } from '../../ErrorComponent/ErrorComponent';
import {
  CustomTextField,
  FormFieldLabel,
  StyledFormFieldSection,
} from '../../custom-fields/CustomFields';

export const SignUpFields = (
  handleInputChanged: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  errors: Record<string, string[]>,
  formValues: Record<string, string>,
) => {
  return (
    <Box className='signupFormFields'>
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
          inputProps={{ maxLength: 50 }}
          onChange={handleInputChanged}
          value={formValues.email}
        />
        <ErrorComponent fieldName='email' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <FormFieldLabel>First name</FormFieldLabel>
        <CustomTextField
          autoFocus
          required
          margin='dense'
          id='firstName'
          name='firstName'
          label='First name'
          type='text'
          fullWidth
          variant='outlined'
          autoComplete='name'
          InputLabelProps={{ shrink: false }}
          inputProps={{ maxLength: 50 }}
          onChange={handleInputChanged}
          value={formValues.firstName}
        />
        <ErrorComponent fieldName='firstName' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <FormFieldLabel>Last name</FormFieldLabel>
        <CustomTextField
          autoFocus
          required
          margin='dense'
          id='lastName'
          name='lastName'
          label='Last name'
          type='text'
          fullWidth
          variant='outlined'
          autoComplete='name'
          InputLabelProps={{ shrink: false }}
          inputProps={{ maxLength: 50 }}
          onChange={handleInputChanged}
          value={formValues.lastName}
        />
        <ErrorComponent fieldName='lastName' errors={errors} />
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
      <StyledFormFieldSection>
        <FormFieldLabel>Confirm your password</FormFieldLabel>
        <CustomTextField
          autoFocus
          required
          margin='dense'
          id='password2'
          name='password2'
          label='Confirm your password'
          type='password'
          fullWidth
          variant='outlined'
          autoComplete='password2'
          InputLabelProps={{ shrink: false }}
          inputProps={{ maxLength: 30 }}
          onChange={handleInputChanged}
          value={formValues.password2}
        />
        <ErrorComponent fieldName='password2' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <FormFieldLabel marginBottom={'6px'}>Where are you located?</FormFieldLabel>
        <AddressAutocomplete
          componentName='location'
          onLocationSelected={(location) =>
            handleInputChanged &&
            handleInputChanged({ target: { name: 'location', value: location } } as any)
          }
        />
        <Box>
          <ErrorComponent fieldName='location.address_components' errors={errors} />
          <ErrorComponent fieldName='location.formatted_address' errors={errors} />
          <ErrorComponent fieldName='location.place_id' errors={errors} />
        </Box>
        <ErrorComponent fieldName='location' errors={errors} />
      </StyledFormFieldSection>
    </Box>
  );
};
