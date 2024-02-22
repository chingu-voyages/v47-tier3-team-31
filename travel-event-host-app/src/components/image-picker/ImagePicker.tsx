import theme from '@/app/theme';
import { Box, Button, Typography } from '@mui/material';

interface ImagePickerProps {
  buttonTitle: string;
  onImageSelected: (e: React.ChangeEvent<HTMLInputElement>) => void;
  buttonProps?: any;
  buttonTypographyProps?: any;
  containerProps?: any;
}

export function ImagePicker({
  buttonTitle,
  onImageSelected,
  buttonProps,
  ...rest
}: ImagePickerProps) {
  return (
    <Box display={'flex'} justifyContent={'center'} sx={{ ...rest.containerProps }}>
      <input
        type='file'
        accept='image/*'
        id='icon-button-photo'
        style={{ display: 'none' }}
        onChange={onImageSelected}
      />
      <label htmlFor='icon-button-photo'>
        <Button
          variant='outlined'
          component='span'
          sx={{
            color: theme.palette.primary.thirdColorIceLight,
            borderColor: theme.palette.primary.thirdColorIceLight,
            fontSize: '0.7rem',
            textAlign: 'center',
            textTransform: 'none',
            padding: '5px',
            mt: 1,
            ...buttonProps,
          }}
        >
          <Typography sx={{ ...rest.buttonTypographyProps }}>{buttonTitle}</Typography>
        </Button>
      </label>
    </Box>
  );
}
