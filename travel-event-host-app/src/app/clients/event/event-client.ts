import Event from '@/models/event';
export async function getEventById(id: string): Promise<Event | undefined> {
  try {
    const response = await fetch(`/api/event/${id}`);
    return response.json();
  } catch (error) {
    throw new Error('Error: Cannot fetch event');
  }
}
