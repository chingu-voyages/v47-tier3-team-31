import theme from '@/app/theme';
import {
  Dialog,
  DialogActions,
  DialogActionsProps,
  DialogContent,
  DialogContentProps,
  DialogProps,
  DialogTitle,
  DialogTitleProps,
  styled,
} from '@mui/material';

export const StyledDialog = (props: DialogProps) => {
  return (
    <CustomDialog
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
        marginTop: ['50px', '50px', '60px'],
      }}
      {...props}
    >
      {props.children}
    </CustomDialog>
  );
};

export const StyledDialogTitle = (props: DialogTitleProps) => {
  return (
    <CustomDialogTitle
      sx={{
        backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
        paddingTop: 0,
        paddingBottom: 0,
      }}
      {...props}
    >
      {props.children}
    </CustomDialogTitle>
  );
};

export const StyledDialogContent = (props: DialogContentProps) => {
  return (
    <CustomDialogContent
      sx={{
        backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
        [theme.breakpoints.down(430)]: {
          padding: '1px',
        },
      }}
      {...props}
    >
      {props.children}
    </CustomDialogContent>
  );
};

export const StyledDialogActions = (props: DialogActionsProps) => {
  return (
    <CustomDialogActions
      sx={{
        backgroundColor: theme.palette.primary.secondaryColorDarkBlack,
        display: 'block',
        marginBottom: 1,
      }}
      {...props}
    >
      {props.children}
    </CustomDialogActions>
  );
};

const CustomDialog = styled(Dialog)(({ theme }) => ({}));
const CustomDialogTitle = styled(DialogTitle)(({ theme }) => ({}));
const CustomDialogContent = styled(DialogContent)(({ theme }) => ({}));
const CustomDialogActions = styled(DialogActions)(({ theme }) => ({}));
