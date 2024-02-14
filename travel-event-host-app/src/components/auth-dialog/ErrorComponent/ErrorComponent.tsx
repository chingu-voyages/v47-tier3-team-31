import ErrorIcon from '@mui/icons-material/Error';
import { Box, Typography } from '@mui/material';
/**
 * Renders error text under the input field when validation fails
 */
export const ErrorComponent = ({
  fieldName,
  errors,
}: {
  fieldName: string;
  errors: Record<string, string[]>;
}) => {
  if (fieldName in errors) {
    return (
      <Box display='flex' gap={'5px'}>
        <ErrorIcon color='error' />
        {errors[fieldName].map((error, index) => (
          <Typography key={index} sx={{ color: 'red' }}>
            {error}
          </Typography>
        ))}
      </Box>
    );
  }
  return null;
};
