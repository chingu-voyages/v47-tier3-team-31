export async function getEventById(eventId: string) {
  const response = await fetch(`/api/event/${eventId}`);
  return response.json();
}
