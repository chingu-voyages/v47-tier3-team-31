import theme from '@/app/theme';
import { Box, Typography } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { ErrorComponent } from '../../ErrorComponent/ErrorComponent';
import { CustomTextField, StyledFormFieldSection } from '../../custom-fields/CustomFields';

export const SignInFields = (
  handleInputChanged: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  errors: Record<string, string[]>,
) => {
  return (
    <Box className='loginFormFields'>
      <StyledFormFieldSection>
        <Typography color={theme.palette.primary.thirdColorIceLight}>E-mail</Typography>
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
        />
        <ErrorComponent fieldName='email' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <Typography color={theme.palette.primary.thirdColorIceLight}>Your password</Typography>
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
        />
        <ErrorComponent fieldName='password1' errors={errors} />
      </StyledFormFieldSection>
    </Box>
  );
};
