import { UserEvent } from '@/models/user-event';

export interface GetAllEventsAPIResponse {
  events: UserEvent[];
  totalCount: number;
}
