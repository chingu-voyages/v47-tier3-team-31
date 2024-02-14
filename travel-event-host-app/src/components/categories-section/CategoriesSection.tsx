import theme from '@/app/theme';
import { CategoryDict } from '@/lib/category-dictionary';
import { Box, Typography } from '@mui/material';
import { CommonButton } from '../common-button/Common-Button';

export function CategoriesSection() {
  return (
    <Box>
      <Box
        className={'categoriesHeaderSection'}
        display='flex'
        justifyContent={'center'}
        mb={3}
        sx={{
          [theme.breakpoints.up(610)]: {
            justifyContent: 'start',
          },
        }}
      >
        <Typography
          fontSize={['0.8rem', '1rem', '1.2rem', '1.5rem', '1.6rem']}
          color={theme.palette.primary.primaryColorDarkerBlue}
          fontWeight={'bold'}
        >
          Categories
        </Typography>
      </Box>
      <Box
        id='categoriesRenderContent'
        display={'flex'}
        flexWrap={'wrap'}
        gap={1}
        justifyContent={'center'}
      >
        {/* This will be where the categories are rendered */}
        {Object.values(CategoryDict).map((category) => (
          <Box key={category}>
            <CommonButton
              label={category}
              baseButtonStyles={{
                color: theme.palette.primary.primaryColorDarkerBlue,
                borderRadius: '8px',
                boxShadow: '0 4px 4px rgba(0, 0, 0, 0.25)',
                textAlign: 'center',
                backgroundColor: 'rgba(26, 34, 59, 0.4)',
                borderColor: 'rgba(26, 34, 59, 0.4)',
                borderWidth: 0,
                minWidth: ['184px', '184px', '284px', '284px', '384px'],
                fontSize: ['0.875rem', '1rem', '1.25rem', '1.3rem', '1.5rem'],
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
