import { Box } from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs from 'dayjs';

interface CalendarPickerProps {
  containerStyles?: React.CSSProperties;
  value: dayjs.Dayjs | null;
  onDateTimeChange?: (date: dayjs.Dayjs | null) => void;
  disablePast?: boolean;
  minDate?: dayjs.Dayjs;
}
export function CalendarPicker({
  containerStyles,
  value,
  onDateTimeChange,
  disablePast,
  minDate,
}: CalendarPickerProps) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Box sx={{ ...containerStyles }}>
        <DateTimePicker
          slotProps={{ textField: { onKeyDown: (e) => e.preventDefault() } }} // This is to stop the user from entering keyboard input
          value={value}
          onChange={(date) => onDateTimeChange && onDateTimeChange(date)}
          disablePast={disablePast}
          minDate={minDate}
          sx={{
            '&&& input': {
              backgroundColor: 'white',
            },
            '& .MuiButtonBase-root': {
              backgroundColor: 'white',
              borderRadius: '0px',
            },
            '& .MuiInputBase-root': {
              backgroundColor: 'white',
            },
          }}
        />
      </Box>
    </LocalizationProvider>
  );
}
