'use client';
import { EventClient } from '@/app/clients/event/event-client';
import {
  profileFormHeaderSizes,
  textInputFieldFontSizes,
  textInputFieldHeights,
  textInputPaddings,
} from '@/app/common-styles/form-field-sizes';
import { getLocationPostDataFromGeocoderResult } from '@/app/integration/google-maps-api/address-helper';
import {
  S3PutObjectCommandParams,
  SpacesFileUploader,
} from '@/app/integration/spaces-file-uploader';
import { generateFilename } from '@/app/integration/utils/generate-filename';
import theme from '@/app/theme';
import { ErrorComponent } from '@/components/ErrorComponent/ErrorComponent';
import { AddressAutocomplete } from '@/components/address-autocomplete/AddressAutocomplete';
import { CalendarPicker } from '@/components/calendar-picker/CalendarPicker';
import { CheckboxGroup } from '@/components/checkbox-group/CheckboxGroup';
import { generateInitialCheckboxState } from '@/components/checkbox-group/utils/generate-initial-checkbox-state';
import { getCheckedElements } from '@/components/checkbox-group/utils/get-checked-elements';
import { CommonButton } from '@/components/common-button/Common-Button';
import { CustomTextField, StyledFormFieldSection } from '@/components/custom-fields/CustomFields';
import { ImagePicker } from '@/components/image-picker/ImagePicker';
import { Spinner } from '@/components/spinner/Spinner';
import { useAuthContext } from '@/lib/auth-context';
import { AuthStatus } from '@/lib/auth-status';
import { Category } from '@/lib/category';
import { CategoryDict } from '@/lib/category-dictionary';
import {
  eventCreateValidationSchema,
  eventCreationCategoriesSchema,
} from '@/lib/yup-validators/event/event-create-validation.schema';
import { extractValidationErrors } from '@/lib/yup-validators/utils/extract-validation-errors';
import { Box, Button, Typography } from '@mui/material';
import dayjs from 'dayjs';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';
import { geocoderResultValidationSchema } from './validators/geocoder-result-validation-schema';
/**
 Event creation page. Only authenticated users can create events. If the user is not authenticated, redirect to the login page.
 */

interface CreateEventPageFormValues {
  title: string;
  description: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
  imageFile: File | null;
  geocoderResult: google.maps.GeocoderResult | null;
}

export default function CreateEventPage() {
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  // This is the state that holds the checked status of the category checkboxes
  // I separated it from the formValues state because it's a different type of state
  // Maybe we can combine them into one state if we can figure out a way to do it
  const [categoryCheckboxesState, setCategoryCheckboxesState] = useState<{
    [key in string]: boolean;
  }>(generateInitialCheckboxState(Category));

  const [formValues, setFormValues] = useState<CreateEventPageFormValues>({
    title: '',
    description: '',
    startDate: dayjs(),
    endDate: dayjs(),
    imageFile: null,
    geocoderResult: null,
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { status, session } = useAuthContext();
  const router = useRouter();

  if (status === AuthStatus.Unauthenticated) {
    return router.replace('/auth/signin');
  }

  const handleInputChanged = (e: any) => {
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
      setFormValues((prev) => ({ ...prev, imageFile: file }));
      const fileReader = new FileReader();

      fileReader.onload = (e) => {
        // Set content in state
        setImagePreview(e.target?.result as string);
      };

      fileReader.readAsDataURL(file);
    }

    //
  };

  const handleSubmitCreateEvent = async () => {
    // Client-side validation of the location (the google geocoder data can't be empty)
    setIsLoading(true);
    try {
      geocoderResultValidationSchema.validateSync(formValues, { abortEarly: false });
    } catch (err: any) {
      const extractedErrors = extractValidationErrors(err);
      console.error('extracted geocoder errors', extractedErrors);
      setErrors(extractValidationErrors(err));
      return;
    }

    let data: any = {
      ...formValues,
      // Convert the date to ISODateString
      startDate: formValues.startDate?.toISOString()!,
      endDate: formValues.endDate?.toISOString(),
      categories: getCheckedElements(categoryCheckboxesState),
      location: {
        ...getLocationPostDataFromGeocoderResult(formValues.geocoderResult!),
      },
    };

    try {
      eventCreateValidationSchema.validateSync(data, { abortEarly: false });
      eventCreationCategoriesSchema.validateSync(data, { abortEarly: false });
    } catch (err: any) {
      console.error(err);
      setErrors(extractValidationErrors(err));
      return;
    }

    if (formValues.imageFile) {
      const randomFileName: string = generateFilename(session?.user?._id);

      const fileParams: S3PutObjectCommandParams = {
        Bucket: process.env.NEXT_PUBLIC_SPACES_AVATAR_BUCKET_PATH!,
        Key: `event_images/${randomFileName}`,
        Body: formValues.imageFile,
        ACL: 'public-read',
      };
      const cdnResolvePath = `${process.env.NEXT_PUBLIC_SPACES_AVATAR_CDN_PATH}/event_images/${randomFileName}`;
      try {
        console.info('Attempting to load image to s3');
        const upLoader: SpacesFileUploader = new SpacesFileUploader();
        await upLoader.uploadObject(fileParams);
        data = {
          ...data,
          imageUrl: cdnResolvePath,
        };
        console.log('image uploaded', cdnResolvePath);
      } catch (e: any) {
        console.error('S3 upload error', e.message);
      }
    }

    try {
      const res = await EventClient.postCreateEvent(data);
      console.info('Event posted to API...redirecting to event page', res._id);
      router.push(`/events/${res._id}`);
    } catch (e: any) {
      console.error('Error creating event', e.message);
    } finally {
      setIsLoading(false);
    }
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
                disablePast={true}
              />
              <ErrorComponent fieldName='startDate' errors={errors} />
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
                minDate={formValues.startDate!}
              />
              <ErrorComponent fieldName='endDate' errors={errors} />
            </Box>
          </Box>
        </StyledFormFieldSection>
        <StyledFormFieldSection>
          <Box id='categories-section'>
            <Typography
              color={theme.palette.primary.thirdColorIceLight}
              sx={{
                fontSize: profileFormHeaderSizes,
                mb: 1,
              }}
            >
              Tag the event with categories (optional)
            </Typography>
            <CheckboxGroup
              state={categoryCheckboxesState}
              dictionary={CategoryDict}
              setStateFunction={setCategoryCheckboxesState}
              customStyles={styles.checkboxGroup}
            />
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
            <AddressAutocomplete
              componentName={'geocoderResult'}
              onLocationSelected={(location) =>
                setFormValues((prev) => ({
                  ...prev,
                  geocoderResult: location as any,
                }))
              }
            />
            <ErrorComponent fieldName='geocoderResult' errors={errors} />
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
          {isLoading ? (
            <Spinner />
          ) : (
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
                disabled={isLoading}
              />
            </Box>
          )}
        </StyledFormFieldSection>
      </Box>
    </Box>
  );
}
