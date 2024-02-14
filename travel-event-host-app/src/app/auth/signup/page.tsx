import AuthDialog from '@/components/auth-dialog/AuthDialog';

export default function SignupPage() {
  return <AuthDialog open={true} authDialogType={'signup'} />;
}
