import { UserEvent } from '@/models/user-event';
import dayjs from 'dayjs';
export function isEventInPast(event: UserEvent): boolean {
  return dayjs(event.endDate).isBefore(dayjs());
}
