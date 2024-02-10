import Category from '@/lib/category';
import Event from '@/models/event';

export async function getEventsBySearchQuery(
  keyword: string,
  categories: Category[],
): Promise<Event[]> {
  try {
    const searchParams = new URLSearchParams();

    if (categories && categories.length > 0) {
      categories.forEach((category) => {
        searchParams.append('category', category);
      });
    }

    if (keyword) {
      searchParams.append('keyword', keyword);
    }

    const apiUrl = `/api/event/search?${searchParams.toString()}`;

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
