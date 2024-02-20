import { UserEvent } from '@/models/user-event';
import dayjs from 'dayjs';
export function isEventInPast(event: UserEvent): boolean {
  if (event?.endDate) {
    return dayjs(event?.endDate).isBefore(dayjs());
  }
  return dayjs(event?.startDate).isBefore(dayjs());
}
