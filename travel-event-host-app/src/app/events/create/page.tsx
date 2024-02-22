'use client';
import {
  profileFormHeaderSizes,
  textInputFieldFontSizes,
  textInputFieldHeights,
  textInputPaddings,
} from '@/app/common-styles/form-field-sizes';
import theme from '@/app/theme';
import { ErrorComponent } from '@/components/ErrorComponent/ErrorComponent';
import { AddressAutocomplete } from '@/components/address-autocomplete/AddressAutocomplete';
import { CalendarPicker } from '@/components/calendar-picker/CalendarPicker';
import { CommonButton } from '@/components/common-button/Common-Button';
import { CustomTextField, StyledFormFieldSection } from '@/components/custom-fields/CustomFields';
import { ImagePicker } from '@/components/image-picker/ImagePicker';
import { useAuthContext } from '@/lib/auth-context';
import { AuthStatus } from '@/lib/auth-status';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

/**
 Event creation page. Only authenticated users can create events. If the user is not authenticated, redirect to the login page.
 */

interface EventPageFormValues {
  title: string;
  description: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  eventImage: File | null;
}

export default function CreateEventPage() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const [formValues, setFormValues] = useState<EventPageFormValues>({
    title: '',
    description: '',
    startDate: dayjs(),
    endDate: dayjs(),
    eventImage: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { status, session } = useAuthContext();
  const router = useRouter();

  if (status === AuthStatus.Unauthenticated) {
    return router.replace('/auth/signin'); // Doublo check this
  }

  const handleInputChanged = (e: any) => {
    // Do something
    setFormValues((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleEventImageChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // TODO: refactor this type of validation so it's DRY as it's used in the profile update component
      if (!file.type.match('image.*')) {
        console.error('File is not an image');
        return;
      }
      setFormValues((prev) => ({ ...prev, eventImage: file }));
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        // Set content in state
        setImagePreview(e.target?.result as string);
      };

      fileReader.readAsDataURL(file);
    }

    //
  };

  const handleSubmitCreateEvent = () => {
    // Validate
  };
  return (
    <Box
      p={'5%'}
      className='eventCreateMain'
      sx={{
        [theme.breakpoints.down('md')]: {
          padding: 0,
          mt: 5,
        },
      }}
    >
      <Box
        className='eventCreate_styledForm'
        width={'100%'}
        sx={{ bgcolor: theme.palette.primary.secondaryColorDarkBlack }}
        p={5}
      >
        <Box>
          <Typography
            fontSize={['1.2rem', '1.8rem']}
            color={theme.palette.primary.thirdColorIceLight}
            sx={{ fontWeight: 'bold', textAlign: 'center', textTransform: 'uppercase' }}
          >
            Create an event
          </Typography>
        </Box>
        <StyledFormFieldSection>
          <Typography
            color={theme.palette.primary.thirdColorIceLight}
            sx={{
              fontSize: profileFormHeaderSizes,
            }}
          >
            Title
          </Typography>
          <CustomTextField
            placeholder='Event Title'
            required
            id='title'
            name='title'
            type='text'
            autoComplete='title'
            inputProps={{ maxLength: 155 }}
            onChange={handleInputChanged}
            fullWidth
            value={formValues.title}
            sx={{
              '&&& input': {
                height: textInputFieldHeights,
                padding: textInputPaddings,
              },
              fontSize: textInputFieldFontSizes,
            }}
          />
          <ErrorComponent fieldName='title' errors={errors} />
        </StyledFormFieldSection>
        <StyledFormFieldSection>
          <Typography
            color={theme.palette.primary.thirdColorIceLight}
            sx={{
              fontSize: profileFormHeaderSizes,
            }}
          >
            Description
          </Typography>
          <CustomTextField
            placeholder='Event Description'
            required
            multiline
            minRows={3}
            maxRows={3}
            inputProps={{ maxLength: 255 }}
            id='description'
            name='description'
            type='text'
            autoComplete='description'
            onChange={handleInputChanged}
            fullWidth
            value={formValues.description}
            sx={{
              '&&& input': {
                height: textInputFieldHeights,
                fontSize: textInputFieldFontSizes,
                padding: textInputPaddings,
              },
              '&.MuiFormControl-root': {
                backgroundColor: 'white',
              },
            }}
          />
          <ErrorComponent fieldName='description' errors={errors} />
        </StyledFormFieldSection>
        <StyledFormFieldSection>
          <Box
            display='flex'
            width={'100%'}
            gap={2}
            justifyContent={'space-between'}
            sx={{
              [theme.breakpoints.down('md')]: {
                flexDirection: 'column',
              },
            }}
          >
            <Box>
              <Typography
                color={theme.palette.primary.thirdColorIceLight}
                sx={{
                  fontSize: profileFormHeaderSizes,
                  alignContent: 'center',
                }}
              >
                Event Starts
              </Typography>
              <CalendarPicker
                containerStyles={{ marginTop: 1 }}
                value={formValues.startDate}
                onDateTimeChange={(date) => setFormValues((prev) => ({ ...prev, startDate: date }))}
              />
            </Box>
            <Box>
              <Typography
                color={theme.palette.primary.thirdColorIceLight}
                sx={{
                  fontSize: profileFormHeaderSizes,
                }}
              >
                Event Ends
              </Typography>
              <CalendarPicker
                containerStyles={{ marginTop: 1 }}
                value={formValues.endDate}
                onDateTimeChange={(date) => setFormValues((prev) => ({ ...prev, endDate: date }))}
              />
            </Box>
          </Box>
        </StyledFormFieldSection>
        <StyledFormFieldSection sx={{ mt: 2, mb: 2 }}>
          <Box>
            <Typography
              color={theme.palette.primary.thirdColorIceLight}
              sx={{
                fontSize: profileFormHeaderSizes,
                mb: 1,
              }}
            >
              Where is this event taking place?
            </Typography>
            <AddressAutocomplete onLocationSelected={(location) => console.log(location)} />
          </Box>
        </StyledFormFieldSection>
        <StyledFormFieldSection>
          {imagePreview && (
            <Box id='event-image-container'>
              <Image src={imagePreview} alt='Event Image' height={169} width={300} />
            </Box>
          )}
          <Box maxWidth={'300px'} id='event-image-container'>
            <Typography
              color={theme.palette.primary.thirdColorIceLight}
              sx={{
                fontSize: profileFormHeaderSizes,
              }}
            >
              Upload an image (optional)
            </Typography>
            <Box>
              <ImagePicker
                buttonTitle='Choose Image'
                onImageSelected={handleEventImageChanged}
                containerProps={{ display: 'block' }}
                buttonTypographyProps={textInputFieldFontSizes}
                buttonProps={{ padding: '5px' }}
              />
            </Box>
          </Box>
        </StyledFormFieldSection>
        <StyledFormFieldSection>
          <Box id='user-actions' mt={5} display='flex' gap={3} justifyContent={'right'}>
            <Button sx={{ textTransform: 'none' }}>
              <Typography sx={{ color: theme.palette.primary.burntOrangeCancelError }}>
                Cancel
              </Typography>
            </Button>
            <CommonButton
              variant='outlined'
              label='Create Event'
              borderColor={theme.palette.primary.greenConfirmation}
              textColor={theme.palette.primary.greenConfirmation}
              onButtonClick={handleSubmitCreateEvent}
              borderRadius={'2px'}
              borderWidth={'1px'}
            />
          </Box>
        </StyledFormFieldSection>
      </Box>
    </Box>
  );
}
