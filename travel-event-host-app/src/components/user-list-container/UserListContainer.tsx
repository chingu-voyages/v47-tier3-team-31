import theme from '@/app/theme';
import { SecureUser } from '@/types/secure-user';
import { Box, Typography, styled } from '@mui/material';
import CustomGenericMuiAvatar from '../avatar/custom-generic-user-avatar/CustomGenericUserAvatar';
import UserAvatar from '../avatar/user-avatar/UserAvatar';
import { CommonButton } from '../common-button/Common-Button';

interface UserListContainerProps {
  title: string; // the title of the user list (for example, "Attendees")
  totalUserCount: number; // the total number of users
  previewUsers: Partial<SecureUser>[]; // the users to show in the preview (it will never been all users, just a subset of them)
  onSeeAllClick?: () => void; // the function to call when the "see all" button is clicked
}

export default function UserListContainerProps({
  title,
  previewUsers,
  totalUserCount,
}: UserListContainerProps) {
  return (
    <Box className='userListContainerMain'>
      <Box
        className='userListContainerHeader'
        mb={3}
        sx={{
          [theme.breakpoints.up('md')]: {
            display: 'flex',
            justifyContent: 'space-between',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex', // this is to center the title (for example, "Attendees") and the total user count
            justifyContent: 'center',
            [theme.breakpoints.up('md')]: {
              justifyContent: 'flex-start',
            },
          }}
        >
          <Typography color='black' fontSize={['1rem', '1rem', '1.3rem', '1.6rem', '1.8rem']}>
            {title}
            {` (${totalUserCount || 0})`}
          </Typography>
        </Box>
        <Box
          sx={{
            display: 'none',
            [theme.breakpoints.up('md')]: {
              display: 'block', // "See all" button is only visible in flex for larger screen sizes
            },
          }}
        >
          <SeeAllButton customLabel='See all' />
        </Box>
      </Box>
      <Box
        className='userListContainerPreview'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          [theme.breakpoints.up('md')]: {
            flexDirection: 'row',
            justifyContent: 'space-between',
          },
        }}
      >
        {previewUsers &&
          previewUsers.map((user, index) => (
            <Box display='flex' justifyContent={'center'} key={index}>
              <UserAvatar
                key={index}
                user={user}
                MuiAvatarComponent={<CustomGenericMuiAvatar theme={theme} />}
                showName={true}
              />
            </Box>
          ))}
      </Box>
      <Box
        sx={{
          display: 'none',
          [theme.breakpoints.down('md')]: {
            display: 'block',
          },
        }}
      >
        {/* for the see all button to be visible for smaller screen sizes at the bottom after the user avatars */}
        <Box display='flex' justifyContent='center' mt={3}>
          <SeeAllButton customLabel='See all' />
        </Box>
      </Box>
    </Box>
  );
}

const SeeAllButton = ({ customLabel, ...rest }: { customLabel: string }) => {
  return (
    <CommonButton
      label={customLabel}
      variant='text'
      textColor={theme.palette.primary.lightNightBlue}
      baseButtonStyles={{
        textTransform: 'none',
        fontWeight: 'normal',
        fontSize: ['1rem', '1rem', '1.3rem', '1.6rem', '1.8rem'],
      }}
      {...rest}
    />
  );
};

const CustomResponsiveTypoGraphy = styled(Typography)(({ theme }) => ({}));
