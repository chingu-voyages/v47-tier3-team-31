import CategoriesType from '@/components/searchSection/types';
import Event from '@/models/event';

export async function getEventsBySearchQuery(
  keyword: string,
  categories: CategoriesType,
): Promise<Event[]> {
  try {
    let queryParams = '';

    Object.entries(categories).forEach(([categoryName, value]) => {
      if (value) {
        queryParams += `&Category=${categoryName}`;
      }
    });

    if (keyword) {
      queryParams += `&keyword=${keyword}`;
    }

    if (queryParams.length > 0) {
      queryParams = queryParams.substring(1);
    }

    const apiUrl = `/api/event/search?${queryParams}`;

    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data.events;
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Error: Cannot fetch user's events");
  }
}
