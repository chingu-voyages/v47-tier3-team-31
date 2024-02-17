import theme from '@/app/theme';
import ErrorIcon from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';
/**
 * Renders error text under the input field when validation fails
 */
export const ErrorComponent = ({
  fieldName,
  errors,
  errorIconStyles,
  typographyStyles,
  containerStyles,
}: {
  fieldName: string;
  errors: Record<string, string[]>;
  errorIconStyles?: { [key: string]: string };
  typographyStyles?: { [key: string]: string };
  containerStyles?: { [key: string]: string };
}) => {
  if (fieldName in errors) {
    return (
      <Box sx={{ ...containerStyles }} gap={'5px'}>
        <Box display='flex'>
          <ErrorIcon
            sx={{
              fontSize: '1rem',
              color: theme.palette.primary.burntOrangeCancelError,
              ...errorIconStyles,
            }}
          />
          <Box display='flex' flexDirection={'column'}>
            {errors[fieldName].map((error, index) => (
              <Typography
                key={index}
                sx={{
                  color: theme.palette.primary.burntOrangeCancelError,
                  fontSize: '0.7rem',
                  ...typographyStyles,
                }}
              >
                {error}
              </Typography>
            ))}
          </Box>
        </Box>
      </Box>
    );
  }
  return null;
};
