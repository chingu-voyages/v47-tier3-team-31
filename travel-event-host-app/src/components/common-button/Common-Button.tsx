'use client';
import { Button, useTheme } from '@mui/material';

interface CommonButtonProps {
  onButtonClick?: () => void;
  label: string; // The actual text label of the button
  textColor?: string; // The color of the text of the button
  backgroundColor?: string; // The background color of the button
  borderColor?: string; // The color of the border of the button
  borderRadius?: string | number; // The radius of the border of the button
  borderWidth?: string | number; // The width of the border of the button
  textTransform?: string; // The text transform of the button
  fontWeight?: string; // The font weight of the button
  additionalStyles?: Record<string, any>; // Any additional styles that you want to add to the button
}

export default function CommonButton({
  fontWeight,
  onButtonClick,
  backgroundColor,
  textColor,
  borderColor,
  textTransform,
  borderRadius,
  borderWidth,
  label,
  additionalStyles,
}: CommonButtonProps) {
  const theme = useTheme();

  const handleButtonClick = () => {
    onButtonClick && onButtonClick();
  };
  return (
    <Button
      variant='outlined'
      onClick={handleButtonClick}
      sx={{
        '&.MuiButtonBase-root': {
          borderRadius: borderRadius || '50px',
          borderWidth: borderWidth || '2px',
          backgroundColor: backgroundColor || null,
          color: textColor || theme.palette.primary.lightNightBlue,
          borderColor: borderColor || theme.palette.primary.lightNightBlue,
          fontWeight: fontWeight || 'bold',
          textTransform: textTransform || 'none',
        },
        ...additionalStyles,
      }}
    >
      {label}
    </Button>
  );
}
