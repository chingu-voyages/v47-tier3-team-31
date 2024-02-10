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
  disabled?: boolean; // Whether the button is disabled or not
  startIcon?: React.ReactNode; // The icon that will be displayed at the start of the button
  baseButtonStyles?: Record<string, any>; // Any base styles that you want to add to the button
  variant?: 'text' | 'outlined' | 'contained' | undefined; // The variant of the button
}

export function CommonButton({
  fontWeight,
  onButtonClick,
  backgroundColor,
  textColor,
  borderColor,
  textTransform,
  borderRadius,
  borderWidth,
  label,
  baseButtonStyles,
  additionalStyles,
  disabled,
  startIcon,
  variant,
}: CommonButtonProps) {
  const theme = useTheme();

  const handleButtonClick = () => {
    onButtonClick && onButtonClick();
  };
  return (
    <Button
      variant={variant || 'outlined'}
      onClick={handleButtonClick}
      disabled={disabled}
      startIcon={startIcon || null}
      sx={{
        '&.MuiButtonBase-root': {
          borderRadius: borderRadius || '50px',
          borderWidth: borderWidth || '2px',
          backgroundColor: backgroundColor || null,
          color: textColor || theme.palette.primary.lightNightBlue,
          borderColor: borderColor || theme.palette.primary.lightNightBlue,
          fontWeight: fontWeight || 'bold',
          textTransform: textTransform || 'none',
          ...baseButtonStyles,
        },
        ...additionalStyles,
      }}
    >
      {label}
    </Button>
  );
}
