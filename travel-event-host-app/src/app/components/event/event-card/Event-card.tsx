import { Box, Card, CardContent, CardMedia } from '@mui/material';
import HostedEvent from '../../../../models/event';

interface EventCardProps {
  hostedEvent: HostedEvent;
  onClick?: () => void;
}

export default function EventCard({ hostedEvent }: EventCardProps) {
  return (
    <Card sx={{ maxWidth: '343px' }}>
      <CardMedia />
      <CardContent>
        <Box>
          <Box display='flex'>
            <Box className='dateContainer'></Box>
            <Box className='eventTitleContainer'></Box>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
