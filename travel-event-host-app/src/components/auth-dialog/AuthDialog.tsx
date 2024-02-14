'use client';

import { registerUser, signInUser } from '@/app/clients/auth-client/auth-client';
import { SignInAPIResponse } from '@/app/clients/auth-client/signin-api-response';
import GitHubIcon from '@mui/icons-material/GitHub';
import GoogleIcon from '@mui/icons-material/Google';
import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  styled,
  useTheme,
} from '@mui/material';
import { ChangeEventHandler, useState } from 'react';
import { ErrorComponent } from './ErrorComponent/ErrorComponent';
import { SignInFields } from './sign-in-fields/SignInFields';
import { SignUpFields } from './sign-up-fields/SignUpFields';
import { validateLogin } from './validation/sign-in';
import { validateSignUp } from './validation/sign-up';

/**
 * Dialog used for signup and login
 */

interface AuthDialogProps {
  open: boolean;
  authDialogType: 'signin' | 'signup';
}

export default function AuthDialog(props: AuthDialogProps) {
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [formValues, setFormValues] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [apiErrors, setApiErrors] = useState<Record<string, string[]> | undefined>(undefined); // Errors returned from the API [
  const theme = useTheme();

  const handleSubmit = async () => {
    // Validate the signup form
    if (props.authDialogType === 'signup') {
      const signupValidationErrors: Record<string, string[]> = validateSignUp({
        email: formValues.email,
        firstName: formValues.firstName,
        lastName: formValues.lastName,
        password1: formValues.password1,
        password2: formValues.password2,
      });
      setErrors(signupValidationErrors); // Show or clear any errors on the form

      if (Object.keys(signupValidationErrors).length > 0) {
        // There are errors on the form, so we don't submit
        return;
      }

      try {
        setIsLoading(true);
        await registerUser({
          email: formValues.email,
          firstName: formValues.firstName,
          lastName: formValues.lastName,
          password: formValues.password1,
        });

        console.info('Signup successful - attempting to signin immediately');

        // Attempt to sign in immediately
        await signInUser({
          email: formValues.email,
          password: formValues.password1,
          isRegistering: true,
        });
      } catch (e: any) {
        console.error(e);
        setApiErrors({ apiError: [e.message] });
      } finally {
        setIsLoading(false);
      }
    } else {
      // Validate the signin form
      const signInValidationErrors: Record<string, string[]> = validateLogin({
        email: formValues.email,
        password: formValues.password1,
      });
      setErrors(signInValidationErrors);

      if (Object.keys(signInValidationErrors).length > 0) {
        return;
      }
      console.info('Attempting to sign in');
      // Complete the signin. The nextAuth signin function will handle the default redirect,
      // or we can specify a redirect URL in the signInUser function
      const res: SignInAPIResponse = await signInUser({
        email: formValues.email,
        password: formValues.password1,
      });

      if (!res.success) {
        setErrors(res.errors || {});
        setApiErrors(res.errors);
      }
    }
  };

  const handleFormValueChanged = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <Dialog
      open={props.open}
      sx={{
        '& .MuiPaper-root': {
          backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
          width: '100%',
        },
        [theme.breakpoints.down(430)]: {
          '& .MuiPaper-root': {
            margin: 0,
          },
        },
      }}
    >
      <DialogTitle sx={{ backgroundColor: theme.palette.primary.secondaryColorDarkBlack }}>
        <Box>
          <Box mt={3}>
            <Box>{/* App logo goes here */}</Box>
            <Box>
              <Typography
                variant='h4'
                color={theme.palette.primary.thirdColorIceLight}
                sx={{ fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}
              >
                {props.authDialogType === 'signup' ? 'Sign Up' : 'Sign In'}
              </Typography>
            </Box>
          </Box>
        </Box>
      </DialogTitle>
      <Box
        ml={'1.5rem'}
        mr={'1.5rem'}
        sx={{
          [theme.breakpoints.down(430)]: {
            marginLeft: '2px',
            marginRight: '2px',
            padding: 0,
          },
        }}
      >
        <DialogContent
          sx={{
            backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
            [theme.breakpoints.down(430)]: {
              padding: '1px',
            },
          }}
        >
          <Box
            className='providerAuthSection'
            display='flex'
            flexDirection={'column'}
            mb={5}
            mt={5}
          >
            <Box alignSelf={'center'} mb={2}>
              {/* Google sign up button */}
              <Button
                variant='outlined'
                startIcon={<GoogleIcon />}
                sx={{
                  '&.MuiButtonBase-root': {
                    color: theme.palette.primary.thirdColorIceLight,
                    borderColor: theme.palette.primary.thirdColorIceLight,
                  },
                }}
              >
                {' '}
                Continue with Google{' '}
              </Button>
            </Box>

            <Box alignSelf={'center'}>
              {/* Github sign up button */}
              <Button
                variant='outlined'
                startIcon={<GitHubIcon />}
                sx={{
                  '&.MuiButtonBase-root': {
                    color: theme.palette.primary.thirdColorIceLight,
                    borderColor: theme.palette.primary.thirdColorIceLight,
                  },
                }}
              >
                {' '}
                Continue with Github{' '}
              </Button>
            </Box>
          </Box>
          <Divider
            sx={{
              marginBottom: 3,
              '&.MuiDivider-root::before': {
                borderColor: theme.palette.primary.thirdColorlightBlack,
              },
              '&.MuiDivider-root::after': {
                borderColor: theme.palette.primary.thirdColorlightBlack,
              },
            }}
          >
            <Chip
              label='OR'
              size='small'
              sx={{
                '&.MuiChip-root': {
                  backgroundColor: theme.palette.primary.thirdColorlightBlack,
                  color: theme.palette.primary.thirdColorIceLight,
                  opacity: 0.5,
                },
              }}
            />
          </Divider>
          <form>{renderFormFields(props.authDialogType, handleFormValueChanged, errors)}</form>
        </DialogContent>
        <DialogActions
          sx={{
            backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
            display: 'block',
            marginBottom: 3,
          }}
        >
          <Box
            display='flex'
            justifyContent={'space-around'}
            sx={{
              [theme.breakpoints.down(430)]: {
                flexDirection: 'column',
              },
            }}
          >
            <Box>
              <StyledButton
                variant={'contained'}
                size={'large'}
                sx={{ marginBottom: '1rem' }}
                onClick={handleSubmit}
              >
                {props.authDialogType === 'signup' ? 'Sign Up' : 'Go'}
              </StyledButton>
            </Box>
          </Box>
        </DialogActions>
        {apiErrors && (
          <Box mb={4}>
            <ErrorComponent fieldName='apiError' errors={apiErrors} />{' '}
          </Box>
        )}
      </Box>
    </Dialog>
  );
}

function renderFormFields(
  authDialogType: 'signin' | 'signup',
  handleValueChanged: ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined,
  errors: Record<string, string[]>,
) {
  if (authDialogType === 'signup') {
    return SignUpFields(handleValueChanged, errors);
  }
  return SignInFields(handleValueChanged, errors);
}

const StyledButton = styled(Button)(({ theme }) => ({
  [theme.breakpoints.down(430)]: {
    width: '100%',
  },
}));
