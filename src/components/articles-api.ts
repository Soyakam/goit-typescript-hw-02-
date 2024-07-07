import axios from "axios";

const baseURL = "https://api.unsplash.com/";
const API_KEY = "6IiMlLAaCxev4mtziG99uH8TXWQt2HW3NBl9SJUb6m4";

// Define the shape of the response data
interface UnsplashPhoto {
  id: string;
  alt_description: string | null;
  urls: {
    regular: string;
  };
}

interface UnsplashResponse {
  results: UnsplashPhoto[];
}

export interface Article {
  id: string;
  title: string;
  imageUrl: string;
}

export const fetchArticlesWithTopic = async (topic: string, page: number): Promise<Article[]> => {
  try {
    const response = await axios.get<UnsplashResponse>(`${baseURL}/search/photos`, {
      params: {
        query: topic,
        client_id: API_KEY,
        page,
      },
    });

    // Transform the UnsplashPhoto objects to Article objects
    return response.data.results.map((photo: UnsplashPhoto) => ({
      id: photo.id,
      title: photo.alt_description || "No title",
      imageUrl: photo.urls.regular,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
