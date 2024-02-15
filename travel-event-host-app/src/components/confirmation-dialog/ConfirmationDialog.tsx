import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

interface ConfirmationDialogProps {
  open: boolean;
  title: string;
  prompt: string;
  options: {
    title: string;
    action: () => void;
    color?: 'success' | 'inherit' | 'error' | 'info' | 'warning' | 'primary' | 'secondary';
  }[];
}

export function ConfirmationDialog({ open, prompt, options, title }: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      aria-labelledby='alert-confirm-action'
      aria-describedby='alert-dialog-description'
    >
      <DialogTitle id='alert-dialog-title'>{title}</DialogTitle>
      <DialogContent id='alert-dialog-description'>
        <DialogContentText>{prompt}</DialogContentText>
      </DialogContent>
      <DialogActions>
        {options.map((option, index) => (
          <Button key={index} onClick={option.action} color={option.color || 'primary'}>
            {option.title}
          </Button>
        ))}
      </DialogActions>
    </Dialog>
  );
}
