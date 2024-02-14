import theme from '@/app/theme';
import { Box, Typography } from '@mui/material';
import { ChangeEventHandler } from 'react';
import { ErrorComponent } from '../ErrorComponent/ErrorComponent';
import { CustomTextField, StyledFormFieldSection } from '../custom-fields/CustomFields';

export const SignUpFields = (
  handleInputChanged: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  errors: Record<string, string[]>,
) => {
  return (
    <Box className='signupFormFields'>
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
          inputProps={{ maxLength: 50 }}
          onChange={handleInputChanged}
        />
        <ErrorComponent fieldName='email' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <Typography color={theme.palette.primary.thirdColorIceLight}>First name</Typography>
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
        />
        <ErrorComponent fieldName='firstName' errors={errors} />
      </StyledFormFieldSection>
      <StyledFormFieldSection>
        <Typography color={theme.palette.primary.thirdColorIceLight}>Last name</Typography>
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
        />
        <ErrorComponent fieldName='lastName ' errors={errors} />
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
      <StyledFormFieldSection>
        <Typography color={theme.palette.primary.thirdColorIceLight}>
          Confirm your password
        </Typography>
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
        />
        <ErrorComponent fieldName='password2' errors={errors} />
      </StyledFormFieldSection>
    </Box>
  );
};
