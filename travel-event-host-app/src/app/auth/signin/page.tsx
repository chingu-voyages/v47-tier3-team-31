import AuthDialog from '@/components/auth-dialog/AuthDialog';

export default function SignInPage() {
  return <AuthDialog open={true} authDialogType={'signin'} />;
}
